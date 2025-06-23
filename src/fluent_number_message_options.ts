// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

export type FluentNumberMessageOptions = {
  params?: Intl.NumberFormatOptions & { type?: Intl.PluralRuleType };
  variants?: Partial<Record<Intl.LDMLPluralRule | string | number, string>>;
  defaultVariant?: Intl.LDMLPluralRule | string | number;
};
