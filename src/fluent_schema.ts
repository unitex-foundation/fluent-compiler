// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import type { FluentProvidedSchema } from 'fluent_provided_schema';
import type { FluentMessageList } from 'fluent_message_list';

export type FluentSchema = FluentProvidedSchema extends infer T
  ? T extends FluentMessageList
    ? T
    : never
  : FluentMessageList;
