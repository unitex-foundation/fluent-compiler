// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <grigorii@lutkov.dev>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details

export type FluentEnumVariableOptions = {
  variants?: { [key: string | number]: string };
  defaultVariant?: string | number;
};
