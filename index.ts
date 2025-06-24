// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

export * from './dist/initialization'
//
export * from './dist/compiler';
export * from './dist/parser';
export * from './dist/validators';
//
export * from './dist/define_message';
//
export * from './dist/fluent_date_variable_options';
export * from './dist/fluent_defined_message';
export * from './dist/fluent_enum_variable_options';
export * from './dist/fluent_localization_base';
export * from './dist/fluent_message_list';
export * from './dist/fluent_message_options';
export * from './dist/fluent_number_variable_options';
export * from './dist/fluent_plural_variable_options';
export * from './dist/fluent_variable_options';
export * from './dist/fluent_variable_type';

// Example how to use localization in your project
// 1. Replace base message list types by declaring a module which
// will override internal empty `FluentLocalizationBase` interface
// 2. Implement "t" functions
//
// Step 1:
//
// declare module 'fluent-compiler/dist/fluent_localization_base' {
//   interface FluentLocalizationBase {
//     messageList: typeof YourFluentMessageList;
//   }
// }
//
// Step 2:
//
// export function t<
//   K extends FluentBaseMessageKeyWitoutVariables
// >(key: K): string;
//
// export function t<
//   K extends FluentBaseMessageKeyWithVariables,
//   A extends FluentBaseMessageArgsAtKey<K>,
// >(key: K, args: A): string;
//
// export function t<
//   K extends FluentBaseMessageKey,
//   A extends FluentBaseMessageArgsAtKey<K>,
// >(key: K, args?: A): string {
//   return ...
// }
