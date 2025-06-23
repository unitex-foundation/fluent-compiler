// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import type { FluentDateMessageOptions } from 'src/fluent_date_message_options';
import type { FluentEnumMessageOptions } from 'src/fluent_enum_message_options';
import type { FluentListMessageOptions } from 'src/fluent_list_message_options';
import type { FluentNumberMessageOptions } from 'src/fluent_number_message_options';
import type { FluentPluralMessageOptions } from 'src/fluent_plural_message_options';

export type FluentMessageOptions =
  | FluentDateMessageOptions
  | FluentEnumMessageOptions
  | FluentListMessageOptions
  | FluentNumberMessageOptions
  | FluentPluralMessageOptions;
