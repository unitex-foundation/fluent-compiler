export type FluentNumberVariableOptions = {
    params?: Intl.NumberFormatOptions & {
        type?: Intl.PluralRuleType;
    };
    variants?: Record<Intl.LDMLPluralRule | string | number, string>;
    defaultVariant?: Intl.LDMLPluralRule | string | number;
};
