// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

export enum FluentVariableType {
  Datetime = 'datetime',
  Enum = 'enum',
  Number = 'number',
  Plural = 'plural',
}

export const FLUENT_VARIABLE_TYPES_SET: ReadonlySet<FluentVariableType> =
  Object.freeze(new Set(Object.values(FluentVariableType)));
