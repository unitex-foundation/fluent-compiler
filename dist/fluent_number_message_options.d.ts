export type FluentNumberMessageOptions = {
    params?: Intl.NumberFormatOptions & {
        type?: Intl.PluralRuleType;
    };
    variants?: Partial<Record<Intl.LDMLPluralRule | string | number, string>>;
    defaultVariant?: Intl.LDMLPluralRule | string | number;
};
//# sourceMappingURL=fluent_number_message_options.d.ts.map