// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import type { FluentMessageValue } from 'fluent_message_value';

type ExpectedKey = string | number | bigint | boolean | null | undefined;

export type FluentMessageList = { [key: string]: FluentMessageValue };

export type FluentMessageListWithPrefix<P extends string> = Record<
  `${P}${string}`,
  FluentMessageValue
>;

export type FluentMessageListWithEnum<T extends string> = {
  [V in T]: FluentMessageValue;
};

export type FluentMessageListWithArray<T extends string[] | readonly string[]> =
  { [V in T[number]]: FluentMessageValue };

export type FluentMessageListWithObjectKeys<
  T extends { [key: string]: string },
> = { [K in keyof T]: FluentMessageValue };

export type FluentMessageListWithObjectValues<
  T extends { [key: string]: string },
> = { [K in keyof T as T[K]]: FluentMessageValue };

export type FluentMessageListWithPrefixedEnum<
  P extends string,
  T extends string,
> = { [V in T as `${P}${V}`]: FluentMessageValue };

export type FluentMessageListWithPrefixedArray<
  P extends string,
  T extends string[] | readonly string[],
> = { [V in T[number] as `${P}${V}`]: FluentMessageValue };

export type FluentMessageListWithPrefixedObjectKeys<
  P extends string,
  T extends { [key: string]: string },
> = {
  [K in Extract<keyof T, ExpectedKey> as `${P}${K}`]: FluentMessageValue;
};

export type FluentMessageListWithPrefixedObjectValues<
  P extends string,
  T extends { [key: string]: string },
> = { [K in keyof T as `${P}${T[K]}`]: FluentMessageValue };
