// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <grigorii@lutkov.dev>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import fs from 'fs';
import { FluentReaderBack } from '@unitex/fluent-compiler/back/fluent_reader_back';
import { messages as messagesEn } from 'example/messages';
import { compile } from '@unitex/fluent-compiler/compiler';
import {
  namespacedMessagesEn,
  namespacedMessagesRu,
} from 'example/namespaced_messages';

declare module '@unitex/fluent-compiler/fluent_provided_schema' {
  type CustomMessages = typeof messagesEn & typeof namespacedMessagesEn;

  interface FluentProvidedSchema extends CustomMessages {}
}

const filePaths = Object.freeze({
  messagesEn: 'temp/en/messages.ftl',
  namespacedMessagesEn: 'temp/en/namespaced_messages.ftl',
  namespacedMessagesRu: 'temp/ru/namespaced_messages.ftl',
} as const);

const compiledMessagesEn = compile(messagesEn, true);
const compiledNamespacedEn = compile(namespacedMessagesEn, true);
const compiledNamespacedRu = compile(namespacedMessagesRu, true);

if (fs.existsSync('temp')) {
  fs.rmSync('temp', { recursive: true });
}
fs.mkdirSync('temp/en', { recursive: true });
fs.mkdirSync('temp/ru', { recursive: true });
fs.writeFileSync(filePaths.messagesEn, compiledMessagesEn);
fs.writeFileSync(filePaths.namespacedMessagesEn, compiledNamespacedEn);
fs.writeFileSync(filePaths.namespacedMessagesRu, compiledNamespacedRu);

const reader = new FluentReaderBack({
  currentLocaleCode: 'en',
  defaultLocaleCode: 'en',
  supportedLocaleCodes: new Set(['en', 'ru']),
  translations: new Map([
    ['en', [filePaths.messagesEn, filePaths.namespacedMessagesEn]],
    ['ru', [filePaths.namespacedMessagesRu]],
  ]),
});

console.log(
  '\n',
  reader.getLocalizedString('hello'),
  '\n',
  reader.getLocalizedString('welcome', { user: 'User' }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 1 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 2 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 3 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 4 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 5 }),
  '\n',
  // @ts-expect-error intentional
  reader.getLocalizedString('not-existent'),
);

reader.setCurrentLocaleCode('ru');

console.log(
  '\n',
  reader.getLocalizedString('hello'),
  '\n',
  reader.getLocalizedString('welcome', { user: 'Юзер' }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 1 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 2 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 3 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 4 }),
  '\n',
  reader.getLocalizedString('example_your-rank-compiled', { pos: 5 }),
  '\n',
  // @ts-expect-error intentional
  reader.getLocalizedString('not-existent'),
);
