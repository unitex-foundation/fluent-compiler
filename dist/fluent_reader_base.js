// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
import { FluentBundle, } from '@fluent/bundle';
import { negotiateLanguages } from '@fluent/langneg';
export class FluentReaderBase {
    bundles;
    defaultLocaleCode; // default
    supportedLocaleCodes; // all supported lang
    nativeLocaleCode = Intl.DateTimeFormat().resolvedOptions().locale;
    _currentLocaleCode; // current
    _fallbackLocaleCodes; // order of fallback
    _lookupLocaleCodes = []; // lookup order
    constructor(args) {
        if (args.supportedLocaleCodes.size === 0) {
            throw new Error('FluentReaderBase.constructor: provided list of supported locale codes is empty');
        }
        if (!args.supportedLocaleCodes.has(args.defaultLocaleCode)) {
            throw new Error(`FluentReaderBase.constructor: default locale code "${args.defaultLocaleCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`);
        }
        if (!args.supportedLocaleCodes.has(args.currentLocaleCode)) {
            throw new Error(`FluentReaderBase.constructor: current locale code "${args.currentLocaleCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`);
        }
        if (args.fallbackLocaleCodes !== undefined) {
            for (const localeCode of args.fallbackLocaleCodes) {
                if (!args.supportedLocaleCodes.has(localeCode)) {
                    throw new Error(`FluentReaderBase.constructor: provided fallback locale code "${localeCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`);
                }
            }
        }
        for (const [localeCode] of args.resources) {
            if (!args.supportedLocaleCodes.has(localeCode)) {
                throw new Error(`FluentReaderBase.constructor: provided resources locale code "${localeCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`);
            }
        }
        this.defaultLocaleCode = args.defaultLocaleCode;
        this.supportedLocaleCodes = args.supportedLocaleCodes;
        this._currentLocaleCode = args.currentLocaleCode;
        this._fallbackLocaleCodes = args.fallbackLocaleCodes;
        this.updateLookupOrder();
        const bundles = Array.from(args.resources.entries().map(([localeCode, resources]) => {
            const bundle = new FluentBundle(localeCode);
            resources.forEach((resource) => {
                const errors = bundle.addResource(resource);
                if (errors.length > 0) {
                    console.warn(`FluentReaderBase.constructor: encounter errors while loading localization resource for locale code "${localeCode}":\n`, errors.join('\n'));
                }
            });
            return [localeCode, bundle];
        }));
        this.bundles = new Map(bundles);
    }
    // ---------------------------------------------------------------------------
    setCurrentLocaleCode(localeCode) {
        if (!this.supportedLocaleCodes.has(localeCode)) {
            throw new Error(`FluentReaderBase.setCurrentLocaleCode: locale code "${localeCode}" is not in the supported list "${[...this.supportedLocaleCodes].join(', ')}"`);
        }
        this._currentLocaleCode = localeCode;
        this.updateLookupOrder();
    }
    getCurrentLocaleCode() {
        return this._currentLocaleCode;
    }
    // ---------------------------------------------------------------------------
    setFallbackLocaleCodes(localeCodes) {
        if (localeCodes !== undefined) {
            for (const localeCode of localeCodes) {
                if (!this.supportedLocaleCodes.has(localeCode)) {
                    throw new Error(`FluentReaderBase.setFallbackLocaleCodes: locale code "${localeCode}" is not in the supported list "${[...this.supportedLocaleCodes].join(', ')}"`);
                }
            }
        }
        this._fallbackLocaleCodes = localeCodes;
        this.updateLookupOrder();
    }
    getFallbackLocaleCodes() {
        return this._fallbackLocaleCodes;
    }
    findLocalizedString(key, args) {
        const { message, bundle } = this.findBundleAndMessage(key);
        if (message === undefined || message.value === null) {
            return undefined;
        }
        return bundle.formatPattern(message.value, args);
    }
    getLocalizedString(key, args) {
        return (this.findLocalizedString(key, args) ?? String(key));
    }
    // ---------------------------------------------------------------------------
    findBundleAndMessage(key, args) {
        if (String(key).length === 0) {
            throw new Error(`FluentReaderBase.findBundleAndMessage: localization lookup key "${String(key)}" is empty`);
        }
        if (args?.localeCode !== undefined) {
            const bundle = this.bundles.get(args?.localeCode);
            if (bundle === undefined) {
                return { bundle: undefined, message: undefined };
            }
            const message = bundle.getMessage(String(key));
            if (message === undefined) {
                return { bundle, message: undefined };
            }
            return { bundle, message };
        }
        for (const localeCode of this._lookupLocaleCodes) {
            const bundle = this.bundles.get(localeCode);
            if (bundle === undefined) {
                continue;
            }
            const message = bundle.getMessage(String(key));
            if (message !== undefined) {
                return { bundle, message };
            }
        }
        return { bundle: undefined, message: undefined };
    }
    // Protected =================================================================
    updateLookupOrder() {
        this._lookupLocaleCodes = negotiateLanguages([
            this._currentLocaleCode,
            ...(this._fallbackLocaleCodes ?? []),
            this.nativeLocaleCode,
        ], [...this.supportedLocaleCodes], { defaultLocale: this.defaultLocaleCode });
    }
}
