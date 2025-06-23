// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

export type FluentListMessageOptions = {
  params?: Intl.ListFormatOptions;
  variants?: { [key: string | number]: string };
  defaultVariant?: string | number;
};
