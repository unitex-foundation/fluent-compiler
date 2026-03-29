// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

export type FluentPluralVariableOptions = {
  params?: { type?: Intl.PluralRuleType };
  variants?: Record<Intl.LDMLPluralRule | string | number, string>;
  defaultVariant?: Intl.LDMLPluralRule | string | number;
};
