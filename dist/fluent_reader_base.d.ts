import { FluentBundle, type FluentResource, type Message } from '@fluent/bundle';
import type { FluentSchemaArgsAtKey } from './fluent_schema_args.js';
import type { FluentSchemaKey, FluentSchemaKeyWithVariables, FluentSchemaKeyWitoutVariables } from './fluent_schema_key.js';
type LocaleCode = string;
export declare abstract class FluentReaderBase {
    readonly bundles: ReadonlyMap<LocaleCode, FluentBundle>;
    readonly defaultLocaleCode: LocaleCode;
    readonly supportedLocaleCodes: ReadonlySet<LocaleCode>;
    readonly nativeLocaleCode: string;
    protected _currentLocaleCode: LocaleCode;
    protected _fallbackLocaleCodes?: ReadonlyArray<LocaleCode>;
    protected _lookupLocaleCodes: ReadonlyArray<LocaleCode>;
    constructor(args: Readonly<{
        resources: ReadonlyMap<LocaleCode, ReadonlyArray<FluentResource>>;
        defaultLocaleCode: LocaleCode;
        currentLocaleCode: LocaleCode;
        supportedLocaleCodes: ReadonlySet<LocaleCode>;
        fallbackLocaleCodes?: ReadonlyArray<LocaleCode>;
    }>);
    setCurrentLocaleCode(localeCode: LocaleCode): void;
    getCurrentLocaleCode(): LocaleCode;
    setFallbackLocaleCodes(localeCodes: ReadonlyArray<LocaleCode> | undefined): void;
    getFallbackLocaleCodes(): ReadonlyArray<LocaleCode> | undefined;
    findLocalizedString<K extends FluentSchemaKeyWitoutVariables>(key: K): string | undefined;
    findLocalizedString<K extends FluentSchemaKeyWithVariables, A extends FluentSchemaArgsAtKey<K>>(key: K, args: A): string | undefined;
    getLocalizedString<K extends FluentSchemaKeyWitoutVariables>(key: K): string;
    getLocalizedString<K extends FluentSchemaKeyWithVariables, A extends FluentSchemaArgsAtKey<K>>(key: K, args: A): string;
    findBundleAndMessage(key: FluentSchemaKey, args?: Readonly<{
        localeCode?: LocaleCode;
    }>): {
        bundle: FluentBundle;
        message: Message;
    } | {
        bundle: FluentBundle;
        message: undefined;
    } | {
        bundle: undefined;
        message: undefined;
    };
    updateLookupOrder(): void;
}
export {};
