// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
import { FluentVariableType } from './fluent_variable_type.js';
export const FLUENT_SCHEMA_KEY_REGEXP = /^[a-zA-Z0-9_-]+$/;
export function isFluentVariableType(value) {
    return FLUENT_VARIABLE_TYPES_SET.has(value);
}
export function isFluentSchemaKey(key) {
    return isString(key) && key.length > 0 && FLUENT_SCHEMA_KEY_REGEXP.test(key);
}
export function isFluentSchemaArgs(args) {
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
const FLUENT_VARIABLE_TYPES_SET = Object.freeze(new Set(Object.values(FluentVariableType)));
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isNumber(value) {
    return typeof value === 'number';
}
function isString(value) {
    return typeof value === 'string';
}
function isObject(value) {
    return typeof value === 'object' && value !== null;
}
function isDate(value) {
    return value instanceof Date;
}
