// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import fs from 'fs';
import { FluentResource } from '@fluent/bundle';
import { FluentReaderBase } from 'fluent_reader_base';

type LocaleCode = string;
type FilePath = string;

export class FluentReaderBack extends FluentReaderBase {
  constructor(
    args: Readonly<{
      translations: ReadonlyMap<LocaleCode, ReadonlyArray<FilePath>>;
      defaultLocaleCode: LocaleCode;
      currentLocaleCode: LocaleCode;
      supportedLocaleCodes: ReadonlySet<LocaleCode>;
      fallbackLocaleCodes?: ReadonlyArray<LocaleCode>;
    }>,
  ) {
    const resources = new Map(
      args.translations.entries().map(([localeCode, filePaths]) => {
        const resources = filePaths
          .map((filePath) => fs.readFileSync(filePath, 'utf8'))
          .map((content) => new FluentResource(content));
        return [localeCode, resources] as const;
      }),
    );
    super({ ...args, resources });
  }
}
