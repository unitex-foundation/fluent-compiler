// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License
//
// Inspired by WebDevSimplified
// https://github.com/WebDevSimplified/intl-crash-course

import type { FluentDefinedMessage } from 'src/fluent_defined_message';
import type { FluentLocalizationBase } from 'src/fluent_localization_base';
import type { FluentMessageList } from 'src/fluent_message_list';
import type { FluentMessageOptions } from 'src/fluent_message_options';
import type { FluentVariableOptions } from 'src/fluent_variable_options';

export type FluentBaseMessageList = FluentLocalizationBase extends {
  messageList: infer T;
}
  ? T extends infer MessageList
    ? MessageList
    : never
  : FluentMessageList;

export type FluentBaseMessageKey = keyof FluentBaseMessageList;

type StringWithVariable = `${string}{$${string}}${string}`;

export type FluentBaseMessageKeyWithVariables = {
  [K in FluentBaseMessageKey]: FluentBaseMessageList[K] extends StringWithVariable
    ? K
    : FluentBaseMessageList[K] extends FluentDefinedMessage
      ? FluentBaseMessageList[K]['value'] extends StringWithVariable
        ? K
        : never
      : never;
}[FluentBaseMessageKey];

export type FluentBaseMessageKeyWitoutVariables = {
  [K in FluentBaseMessageKey]: FluentBaseMessageList[K] extends `${string}{$${string}}${string}`
    ? never
    : FluentBaseMessageList[K] extends FluentDefinedMessage
      ? FluentBaseMessageList[K]['value'] extends StringWithVariable
        ? never
        : K
      : K;
}[FluentBaseMessageKey];

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
    undefined;

export type FluentBaseMessageArgsAtKey<K extends FluentBaseMessageKey> =
  FluentBaseMessageList[K] extends string
    ? VariableArgs<FluentBaseMessageList[K], undefined>
    : FluentBaseMessageList[K] extends FluentDefinedMessage
      ? VariableArgs<
          FluentBaseMessageList[K]['value'],
          FluentBaseMessageList[K]['options']
        >
      : never;

type ObjectWithValuesAs<T extends { [K in keyof T]: T[K] }, T_VALUES> = {
  [K in keyof T]: T_VALUES;
};

export type FluentMessageListBasedOn<T extends FluentMessageList> =
  ObjectWithValuesAs<T, string | FluentDefinedMessage>;
