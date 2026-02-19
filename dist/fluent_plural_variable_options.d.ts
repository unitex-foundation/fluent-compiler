export type FluentPluralVariableOptions = {
    params?: {
        type?: Intl.PluralRuleType;
    };
    variants?: Record<Intl.LDMLPluralRule | string | number, string>;
    defaultVariant?: Intl.LDMLPluralRule | string | number;
};
