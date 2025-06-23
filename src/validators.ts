// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import {
  FLUENT_MESSAGE_TYPES_SET,
  FluentMessageType,
} from 'src/fluent_message_type';

export function isFluentMessageType(
  value: unknown,
): value is FluentMessageType {
  return FLUENT_MESSAGE_TYPES_SET.has(value as FluentMessageType);
}
