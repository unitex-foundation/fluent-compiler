// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) Fluent Compiler Contributors
// Licensed under the MIT License

export type FluentDateVariableOptions = {
  params?: Intl.DateTimeFormatOptions;
  variants?: { [key: string | number]: string };
  defaultVariant?: string | number;
};
