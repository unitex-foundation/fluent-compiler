import { FluentReaderBase } from '../fluent_reader_base.js';
type LocaleCode = string;
type FilePath = string;
export declare class FluentReader extends FluentReaderBase {
    constructor(args: Readonly<{
        translations: ReadonlyMap<LocaleCode, ReadonlyArray<FilePath>>;
        defaultLocaleCode: LocaleCode;
        currentLocaleCode: LocaleCode;
        supportedLocaleCodes: ReadonlySet<LocaleCode>;
        fallbackLocaleCodes?: ReadonlyArray<LocaleCode>;
    }>);
}
export {};
