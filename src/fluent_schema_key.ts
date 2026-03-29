// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import type { FluentDefinedMessage } from 'fluent_defined_message';
import type { FluentSchemaContent } from 'fluent_schema_content';

export type FluentSchemaKey = keyof FluentSchemaContent;

type StringWithVariable = `${string}{$${string}}${string}`;

export type FluentSchemaKeyWithVariables = {
  [K in FluentSchemaKey]: FluentSchemaContent[K] extends StringWithVariable
    ? K
    : FluentSchemaContent[K] extends FluentDefinedMessage
      ? FluentSchemaContent[K]['value'] extends StringWithVariable
        ? K
        : never
      : never;
}[FluentSchemaKey];

export type FluentSchemaKeyWitoutVariables = {
  [K in FluentSchemaKey]: FluentSchemaContent[K] extends `${string}{$${string}}${string}`
    ? never
    : FluentSchemaContent[K] extends FluentDefinedMessage
      ? FluentSchemaContent[K]['value'] extends StringWithVariable
        ? never
        : K
      : K;
}[FluentSchemaKey];
