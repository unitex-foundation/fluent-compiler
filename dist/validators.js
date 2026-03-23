// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
import { FLUENT_VARIABLE_TYPES_SET, } from './fluent_variable_type.js';
export function isFluentMessageType(value) {
    return FLUENT_VARIABLE_TYPES_SET.has(value);
}
