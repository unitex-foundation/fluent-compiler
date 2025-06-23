// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

export type FluentPluralVariableOptions = {
  params?: { type?: Intl.PluralRuleType };
  variants?: Record<Intl.LDMLPluralRule | string | number, string>;
  defaultVariant?: Intl.LDMLPluralRule | string | number;
};
