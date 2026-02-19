// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) Fluent Compiler Contributors
// Licensed under the MIT License
//
// Inspired by WebDevSimplified
// https://github.com/WebDevSimplified/intl-crash-course

import type { FluentDateVariableOptions } from 'fluent_date_variable_options';
import type { FluentEnumVariableOptions } from 'fluent_enum_variable_options';
import type { FluentNumberVariableOptions } from 'fluent_number_variable_options';
import type { FluentPluralVariableOptions } from 'fluent_plural_variable_options';

type VariableOptions<
  VariableName extends string,
  VariableType extends string,
> = VariableType extends 'number'
  ? { [K in VariableName]?: FluentNumberVariableOptions }
  : VariableType extends 'plural'
    ? { [K in VariableName]?: FluentPluralVariableOptions }
    : VariableType extends 'datetime'
      ? { [K in VariableName]?: FluentDateVariableOptions }
      : VariableType extends 'enum'
        ? { [K in VariableName]: FluentEnumVariableOptions }
        : never;

type MessageOptions<M_V extends MessageValue> =
  M_V extends `${string}{${infer Variable}}${infer Rest}`
    ? // if has a variable
      Variable extends `${infer Name}:${infer Type}`
      ? // if has a variable with a type
        VariableOptions<Name, Type> & MessageOptions<Rest>
      : // if has a variable without a type
        MessageOptions<Rest>
    : // if has no variables
      unknown;

type MessageValue = string;

export function defineMessage<
  M_V extends MessageValue,
  M_O extends MessageOptions<M_V>,
>(value: M_V, options?: M_O): { value: M_V; options?: M_O } {
  return { value, options };
}
