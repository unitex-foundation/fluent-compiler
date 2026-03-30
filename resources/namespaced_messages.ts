// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

import { defineFluentMessage as dm } from 'fluent_message';
import {
  defineFluentMessageListWithPrefix,
  type FluentMessageList,
} from 'fluent_message_list';

const EXAMPLE_NAMESPACE = 'example_';

export const namespacedMessagesEn = Object.freeze(
  defineFluentMessageListWithPrefix(
    {
      'hello': 'Hello Namespace!',
      'remove-bookmark': 'Are you sure you want to remove {$title}?',
      '-brand-name': 'Mozilla',
      'installing': `Installing {${EXAMPLE_NAMESPACE}-brand-name}.`,
      'your-rank-compiled': dm('{$pos:number}', {
        $pos: {
          params: { type: 'ordinal' },
          variants: {
            1: 'You finished first!',
            one: 'You finished {$}st',
            two: 'You finished {$}nd',
            few: 'You finished {$}rd',
            other: 'You finished {$}th',
          },
          defaultVariant: 'other',
        },
      }),
    } as const satisfies FluentMessageList,
    EXAMPLE_NAMESPACE,
  ),
);

export const namespacedMessagesRu = Object.freeze(
  defineFluentMessageListWithPrefix(
    {
      'hello': 'Привет Неймспейс!',
      'remove-bookmark': 'Вы уверены что хотите удалить {$title}?',
      '-brand-name': 'Мозилла',
      'installing': `Установка {${EXAMPLE_NAMESPACE}-brand-name}.`,
      'your-rank-compiled': dm('{$pos:number}', {
        $pos: {
          params: { type: 'ordinal' },
          variants: {
            1: 'Вы финишировали первым!',
            few: 'Вы финишировали {$}им',
            other: 'Вы финишировали {$}ым',
          },
          defaultVariant: 'other',
        },
      }),
    } as const satisfies FluentMessageList,
    EXAMPLE_NAMESPACE,
  ),
);
