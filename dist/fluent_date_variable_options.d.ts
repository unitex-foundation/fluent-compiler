export type FluentDateVariableOptions = {
    params?: Intl.DateTimeFormatOptions;
    variants?: {
        [key: string | number]: string;
    };
    defaultVariant?: string | number;
};
