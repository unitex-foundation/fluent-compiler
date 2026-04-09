// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import type { FluentSchemaKey } from 'fluent_schema_key';
import { FluentVariableType } from 'fluent_variable_type';

export const FLUENT_SCHEMA_KEY_REGEXP = /^[a-zA-Z0-9_-]+$/;

export function isFluentVariableType(
  value: unknown,
): value is FluentVariableType {
  return FLUENT_VARIABLE_TYPES_SET.has(value as FluentVariableType);
}

export function isFluentSchemaKey(value: unknown): value is FluentSchemaKey {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    FLUENT_SCHEMA_KEY_REGEXP.test(value)
  );
}

// File Private ================================================================

const FLUENT_VARIABLE_TYPES_SET: ReadonlySet<FluentVariableType> =
  Object.freeze(new Set(Object.values(FluentVariableType)));
