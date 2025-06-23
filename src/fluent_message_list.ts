// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import type { FluentDefinedMessage } from 'src/fluent_defined_message';

export type FluentMessageList = {
  [key: string]: string | FluentDefinedMessage;
};
