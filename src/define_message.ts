// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License
//
// Inspired by WebDevSimplified
// https://github.com/WebDevSimplified/intl-crash-course

import type { FluentDateMessageOptions } from 'src/fluent_date_message_options';
import type { FluentEnumMessageOptions } from 'src/fluent_enum_message_options';
import type { FluentListMessageOptions } from 'src/fluent_list_message_options';
import type { FluentNumberMessageOptions } from 'src/fluent_number_message_options';
import type { FluentPluralMessageOptions } from 'src/fluent_plural_message_options';

type ParseOptionType<
  ParamType extends string,
  ParamName extends string,
> = ParamType extends 'number'
  ? { [K in ParamName]?: FluentNumberMessageOptions }
  : ParamType extends 'plural'
    ? { [K in ParamName]?: FluentPluralMessageOptions }
    : ParamType extends 'datetime'
      ? { [K in ParamName]?: FluentDateMessageOptions }
      : ParamType extends 'enum'
        ? { [K in ParamName]: FluentEnumMessageOptions }
        : ParamType extends 'list'
          ? { [K in ParamName]?: FluentListMessageOptions }
          : never;

type ExtractParamOptions<K extends string> =
  K extends `${string}{${infer Param}}${infer Rest}`
    ? // if has a parameter
      Param extends `${infer Name}:${infer Type}`
      ? // if has a parameter with a type
        ParseOptionType<Type, Name> & ExtractParamOptions<Rest>
      : // if has a parameter without a type
        ExtractParamOptions<Rest>
    : // if has no parameters
      unknown;

export function defineMessage<
  K extends string,
  O extends ExtractParamOptions<K>,
>(value: K, options: O): { value: K; options: O } {
  return { value, options };
}
