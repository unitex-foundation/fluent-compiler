// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
import { FluentVariableType } from './fluent_variable_type.js';
export const FLUENT_SCHEMA_KEY_REGEXP = /^[a-zA-Z0-9_-]+$/;
export function isFluentVariableType(value) {
    return FLUENT_VARIABLE_TYPES_SET.has(value);
}
export function isFluentSchemaKey(value) {
    return (typeof value === 'string' &&
        value.length > 0 &&
        FLUENT_SCHEMA_KEY_REGEXP.test(value));
}
// File Private ================================================================
const FLUENT_VARIABLE_TYPES_SET = Object.freeze(new Set(Object.values(FluentVariableType)));
