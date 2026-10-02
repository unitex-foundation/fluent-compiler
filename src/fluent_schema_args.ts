// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <grigorii@lutkov.dev>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import type { FluentDefinedMessage } from './fluent_defined_message';
import type { FluentMessageOptions } from './fluent_message_options';
import type { FluentSchema } from './fluent_schema';
import type { FluentSchemaKey } from './fluent_schema_key';
import type { FluentVariableOptions } from './fluent_variable_options';

type VariableType<
  T extends string,
  V extends FluentVariableOptions['variants'] | undefined,
> = T extends 'number' | 'plural'
  ? number
  : T extends 'datetime'
    ? Date
    : T extends 'enum'
      ? V extends undefined
        ? never
        : keyof V
      : never;

type VariableArgs<
  M_V extends string,
  M_O extends FluentMessageOptions | undefined,
> = M_V extends `${string}{$${infer Variable}}${infer Rest}`
  ? // if has a variable
    Variable extends `${infer Name}:${infer Type}`
    ? // if has a variable with a type
      {
        [K in Name]: VariableType<
          Type,
          M_O extends FluentMessageOptions ? M_O[`$${Name}`]['variants'] : never
        >;
      } & VariableArgs<Rest, M_O>
    : // if has a variable without a type
      { [K in Variable]: string | number } & VariableArgs<Rest, M_O>
  : // if has no variables
    unknown;

export type FluentSchemaArgsAtKey<K extends FluentSchemaKey> =
  FluentSchema[K] extends string
    ? VariableArgs<FluentSchema[K], undefined>
    : FluentSchema[K] extends FluentDefinedMessage
      ? VariableArgs<FluentSchema[K]['value'], FluentSchema[K]['options']>
      : never;

export type FluentSchemaArgs = {
  [K in FluentSchemaKey]: FluentSchemaArgsAtKey<K> extends object
    ? FluentSchemaArgsAtKey<K>
    : never;
}[FluentSchemaKey];
