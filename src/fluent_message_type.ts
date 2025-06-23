// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

export enum FluentMessageType {
  Datetime = 'datetime',
  Enum = 'enum',
  List = 'list',
  Number = 'number',
  Plural = 'plural',
}

export const FLUENT_MESSAGE_TYPES_SET: ReadonlySet<FluentMessageType> =
  Object.freeze(new Set(Object.values(FluentMessageType)));
