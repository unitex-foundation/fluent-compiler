// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
import { FluentVariableType } from './fluent_variable_type.js';
const FLUENT_VARIABLE_TYPES_SET = Object.freeze(new Set(Object.values(FluentVariableType)));
export function isFluentVariableType(value) {
    return FLUENT_VARIABLE_TYPES_SET.has(value);
}
