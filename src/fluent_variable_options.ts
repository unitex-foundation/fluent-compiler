// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import type { FluentDateVariableOptions } from 'src/fluent_date_variable_options';
import type { FluentEnumVariableOptions } from 'src/fluent_enum_variable_options';
import type { FluentNumberVariableOptions } from 'src/fluent_number_variable_options';
import type { FluentPluralVariableOptions } from 'src/fluent_plural_variable_options';

export type FluentVariableOptions =
  | FluentDateVariableOptions
  | FluentEnumVariableOptions
  | FluentNumberVariableOptions
  | FluentPluralVariableOptions;
