// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

export enum FluentVariableType {
  Datetime = 'datetime',
  Enum = 'enum',
  Number = 'number',
  Plural = 'plural',
}

export const FLUENT_VARIABLE_TYPES_SET: ReadonlySet<FluentVariableType> =
  Object.freeze(new Set(Object.values(FluentVariableType)));
