// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import type { FluentDateVariableOptions } from 'fluent_date_variable_options';
import type { FluentEnumVariableOptions } from 'fluent_enum_variable_options';
import type { FluentNumberVariableOptions } from 'fluent_number_variable_options';
import type { FluentPluralVariableOptions } from 'fluent_plural_variable_options';

export type FluentVariableOptions =
  | FluentDateVariableOptions
  | FluentEnumVariableOptions
  | FluentNumberVariableOptions
  | FluentPluralVariableOptions;
