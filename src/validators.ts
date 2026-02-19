// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) Fluent Compiler Contributors
// Licensed under the MIT License

import {
  FLUENT_VARIABLE_TYPES_SET,
  type FluentVariableType,
} from 'fluent_variable_type';

export function isFluentMessageType(
  value: unknown,
): value is FluentVariableType {
  return FLUENT_VARIABLE_TYPES_SET.has(value as FluentVariableType);
}
