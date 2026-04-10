// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import type { FluentSchemaArgs } from 'fluent_schema_args';
import type { FluentSchemaKey } from 'fluent_schema_key';
import { FluentVariableType } from 'fluent_variable_type';

export const FLUENT_SCHEMA_KEY_REGEXP = /^[a-zA-Z0-9_-]+$/;

export function isFluentVariableType(
  value: unknown,
): value is FluentVariableType {
  return FLUENT_VARIABLE_TYPES_SET.has(value as FluentVariableType);
}

export function isFluentSchemaKey(key: unknown): key is FluentSchemaKey {
  return isString(key) && key.length > 0 && FLUENT_SCHEMA_KEY_REGEXP.test(key);
}

export function isFluentSchemaArgs(args: unknown): args is FluentSchemaArgs {
  if (!isObject(args) || Object.entries(args).length === 0) {
    return false;
  }
  for (const key of Object.keys(args)) {
    if (!isString(key)) {
      return false;
    }
  }
  for (const val of Object.values(args)) {
    if (!isBoolean(val) && !isNumber(val) && !isString(val) && !isDate(val)) {
      return false;
    }
  }
  return true;
}

// File Private ================================================================

const FLUENT_VARIABLE_TYPES_SET: ReadonlySet<FluentVariableType> =
  Object.freeze(new Set(Object.values(FluentVariableType)));

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function isDate(value: unknown): value is Date {
  return value instanceof Date;
}
