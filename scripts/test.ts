// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import fs from 'fs';
import { FluentReader } from 'back/fluent_reader';
import { exampleMessages } from 'resources/example_messages';
import { compile } from 'compiler';
import {
  namespacedMessagesEn,
  namespacedMessagesRu,
} from 'resources/namespaced_messages';

declare module 'fluent_schema' {
  type CustomMessages = typeof exampleMessages & typeof namespacedMessagesEn;

  interface FluentSchema extends CustomMessages {}
}

const filePaths = Object.freeze({
  exampleMessages: 'temp/en/example_messages.ftl',
  namespacedMessagesEn: 'temp/en/namespaced_messages.ftl',
  namespacedMessagesRu: 'temp/ru/namespaced_messages.ftl',
} as const);

const compiledExampleEn = compile(exampleMessages, true);
const compiledNamespacedEn = compile(namespacedMessagesEn, true);
const compiledNamespacedRu = compile(namespacedMessagesRu, true);

if (fs.existsSync('temp')) {
  fs.rmSync('temp', { recursive: true });
}
fs.mkdirSync('temp/en', { recursive: true });
fs.mkdirSync('temp/ru', { recursive: true });
fs.writeFileSync(filePaths.exampleMessages, compiledExampleEn);
fs.writeFileSync(filePaths.namespacedMessagesEn, compiledNamespacedEn);
fs.writeFileSync(filePaths.namespacedMessagesRu, compiledNamespacedRu);

const reader = new FluentReader({
  currentLocaleCode: 'en',
  defaultLocaleCode: 'en',
  supportedLocaleCodes: new Set(['en', 'ru']),
  translations: new Map([
    ['en', [filePaths.exampleMessages, filePaths.namespacedMessagesEn]],
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
