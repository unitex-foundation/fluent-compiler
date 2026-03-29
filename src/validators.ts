// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import { FluentVariableType } from 'fluent_variable_type';

const FLUENT_VARIABLE_TYPES_SET: ReadonlySet<FluentVariableType> =
  Object.freeze(new Set(Object.values(FluentVariableType)));

export function isFluentVariableType(
  value: unknown,
): value is FluentVariableType {
  return FLUENT_VARIABLE_TYPES_SET.has(value as FluentVariableType);
}
