// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

// Doc:
// To have autocomplete support you need to redeclare interface like this:
//
// declare module '@unitex/fluent-compiler/dist/fluent_schema' {
//   interface FluentSchema {
//     content: typeof YOUR_FLUENT_MESSAGE_LIST;
//   }
// }

export interface FluentSchema {
  // readonly content: FluentMessageList;
}
