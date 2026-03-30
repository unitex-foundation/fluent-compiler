// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import fs from 'fs';
import { FluentBundle, FluentResource, type Message } from '@fluent/bundle';
import { negotiateLanguages } from '@fluent/langneg';
import type { FluentSchemaArgsAtKey } from 'fluent_schema_args';
import type {
  FluentSchemaKey,
  FluentSchemaKeyWithVariables,
  FluentSchemaKeyWitoutVariables,
} from 'fluent_schema_key';

type LocaleCode = string;
type FilePath = string;

export class FluentReader {
  readonly bundles: ReadonlyMap<LocaleCode, FluentBundle>;

  readonly defaultLocaleCode: LocaleCode; // default
  readonly supportedLocaleCodes: ReadonlySet<LocaleCode>; // all supported lang
  readonly nativeLocaleCode = Intl.DateTimeFormat().resolvedOptions().locale;

  protected _currentLocaleCode: LocaleCode; // current
  protected _fallbackLocaleCodes?: ReadonlyArray<LocaleCode>; // order of fallback
  protected _lookupLocaleCodes: ReadonlyArray<LocaleCode> = []; // lookup order

  constructor(
    args: Readonly<{
      translations: ReadonlyMap<LocaleCode, ReadonlyArray<FilePath>>;
      defaultLocaleCode: LocaleCode;
      currentLocaleCode: LocaleCode;
      supportedLocaleCodes: ReadonlySet<LocaleCode>;
      fallbackLocaleCodes?: ReadonlyArray<LocaleCode>;
    }>,
  ) {
    if (fs === undefined) {
      throw new Error(
        'FluentReader.constructor: can not be used from inside Browser environment, FileSystem (fs) module is required',
      );
    }
    if (args.supportedLocaleCodes.size === 0) {
      throw new Error(
        'FluentReader.constructor: provided list of supported locale codes is empty',
      );
    }
    if (!args.supportedLocaleCodes.has(args.defaultLocaleCode)) {
      throw new Error(
        `FluentReader.constructor: default locale code "${args.defaultLocaleCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`,
      );
    }
    if (!args.supportedLocaleCodes.has(args.currentLocaleCode)) {
      throw new Error(
        `FluentReader.constructor: current locale code "${args.currentLocaleCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`,
      );
    }
    if (args.fallbackLocaleCodes !== undefined) {
      for (const localeCode of args.fallbackLocaleCodes) {
        if (!args.supportedLocaleCodes.has(localeCode)) {
          throw new Error(
            `FluentReader.constructor: provided fallback locale code "${localeCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`,
          );
        }
      }
    }
    for (const [localeCode] of args.translations) {
      if (!args.supportedLocaleCodes.has(localeCode)) {
        throw new Error(
          `FluentReader.constructor: provided translations locale code "${localeCode}" is not in the supported list "${[...args.supportedLocaleCodes].join(', ')}"`,
        );
      }
    }

    this.defaultLocaleCode = args.defaultLocaleCode;
    this.supportedLocaleCodes = args.supportedLocaleCodes;
    this._currentLocaleCode = args.currentLocaleCode;
    this._fallbackLocaleCodes = args.fallbackLocaleCodes;
    this.updateLookupOrder();

    const bundles = Array.from(
      args.translations.entries().map(([localeCode, filePaths]) => {
        const bundle = new FluentBundle(localeCode);
        filePaths
          .map((filePath) => ({
            filePath,
            content: fs.readFileSync(filePath, 'utf8'),
          }))
          .map(({ filePath, content }) => ({
            filePath,
            resource: new FluentResource(content),
          }))
          .forEach(({ filePath, resource }) => {
            const errors = bundle.addResource(resource);
            if (errors.length > 0) {
              console.warn(
                `FluentReader.constructor: encounter errors while loading localization resource at file path "${filePath}":\n`,
                errors.join('\n'),
              );
            }
          });
        return [localeCode, bundle] as const;
      }),
    );

    this.bundles = new Map(bundles);
  }

  // ---------------------------------------------------------------------------

  setCurrentLocaleCode(localeCode: LocaleCode): void {
    if (!this.supportedLocaleCodes.has(localeCode)) {
      throw new Error(
        `FluentReader.setCurrentLocaleCode: locale code "${localeCode}" is not in the supported list "${[...this.supportedLocaleCodes].join(', ')}"`,
      );
    }
    this._currentLocaleCode = localeCode;
    this.updateLookupOrder();
  }

  getCurrentLocaleCode(): LocaleCode {
    return this._currentLocaleCode;
  }

  // ---------------------------------------------------------------------------

  setFallbackLocaleCodes(
    localeCodes: ReadonlyArray<LocaleCode> | undefined,
  ): void {
    if (localeCodes !== undefined) {
      for (const localeCode of localeCodes) {
        if (!this.supportedLocaleCodes.has(localeCode)) {
          throw new Error(
            `FluentReader.setFallbackLocaleCodes: locale code "${localeCode}" is not in the supported list "${[...this.supportedLocaleCodes].join(', ')}"`,
          );
        }
      }
    }
    this._fallbackLocaleCodes = localeCodes;
    this.updateLookupOrder();
  }

  getFallbackLocaleCodes(): ReadonlyArray<LocaleCode> | undefined {
    return this._fallbackLocaleCodes;
  }

  // ---------------------------------------------------------------------------

  findLocalizedString<K extends FluentSchemaKeyWitoutVariables>(
    key: K,
  ): string | undefined;
  findLocalizedString<
    K extends FluentSchemaKeyWithVariables,
    A extends FluentSchemaArgsAtKey<K>,
  >(key: K, args: A): string | undefined;
  findLocalizedString<
    K extends FluentSchemaKey,
    A extends FluentSchemaArgsAtKey<K>,
  >(key: K, args?: A): string | undefined {
    const { message, bundle } = this.findBundleAndMessage(key);
    if (message === undefined || message.value === null) {
      return undefined;
    }
    return bundle.formatPattern(
      message.value,
      args as any, // TODO: avoid `as`
    );
  }

  // ---------------------------------------------------------------------------

  getLocalizedString<K extends FluentSchemaKeyWitoutVariables>(key: K): string;
  getLocalizedString<
    K extends FluentSchemaKeyWithVariables,
    A extends FluentSchemaArgsAtKey<K>,
  >(key: K, args: A): string;
  getLocalizedString<
    K extends FluentSchemaKey,
    A extends FluentSchemaArgsAtKey<K>,
  >(key: K, args?: A): string {
    return (
      this.findLocalizedString(
        key,
        args as any, // TODO: avoid `as`
      ) ?? String(key)
    );
  }

  // ---------------------------------------------------------------------------

  findBundleAndMessage(
    key: FluentSchemaKey,
    args?: Readonly<{ localeCode?: LocaleCode }>,
  ):
    | { bundle: FluentBundle; message: Message }
    | { bundle: FluentBundle; message: undefined }
    | { bundle: undefined; message: undefined } {
    if (String(key).length === 0) {
      throw new Error(
        `FluentReader.findBundleAndMessage: localization lookup key "${String(key)}" is empty`,
      );
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

  updateLookupOrder(): void {
    this._lookupLocaleCodes = negotiateLanguages(
      [
        this._currentLocaleCode,
        ...(this._fallbackLocaleCodes ?? []),
        this.nativeLocaleCode,
      ],
      [...this.supportedLocaleCodes],
      { defaultLocale: this.defaultLocaleCode },
    );
  }
}
