// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import { exampleMessages } from 'resources/example_messages';
import { compile } from 'compiler';
import type { FluentSchemaArgsAtKey } from 'fluent_schema_args';
import type {
  FluentSchemaKey,
  FluentSchemaKeyWithVariables,
  FluentSchemaKeyWitoutVariables,
} from 'fluent_schema_key';
import { defineFluentMessageListWithPrefix } from 'fluent_message_list';

declare module 'fluent_schema' {
  interface FluentSchema {
    content: typeof exampleMessages;
  }
}

const _translations = compile(exampleMessages, true);

function t<K extends FluentSchemaKeyWitoutVariables>(key: K): string;
function t<
  K extends FluentSchemaKeyWithVariables,
  A extends FluentSchemaArgsAtKey<K>,
>(key: K, args: A): string;
function t<K extends FluentSchemaKey, A extends FluentSchemaArgsAtKey<K>>(
  key: K,
  args?: A,
): string {
  // 1. const translations = fs.readFileSync('/path/to/locale/translations.ftl', 'utf8');
  // 2. const resource = new FluentResource(resourceData);
  // 3. const bundle = new FluentBundle(locale);
  // 4. bundle.addResource(resource);
  // 5. const message = bundle.getMessage(key);
  // 6. return bundle.formatPattern(message.value, args);
  return 'Not implemented (Just an example)';
}

console.log(t('hello'));
console.log(t('welcome', { user: 'User' }));

const _withTestPrefix = defineFluentMessageListWithPrefix(
  exampleMessages,
  'test.',
);
