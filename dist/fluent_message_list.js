// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
// -----------------------------------------------------------------------------
export function defineFluentMessageListWithPrefix(list, prefix) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Object.fromEntries(Object.entries(list).map(([key, value]) => [`${prefix}${key}`, value]));
}
