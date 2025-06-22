// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import path from 'path';

export async function compile(args: {
  inputPaths: string[];
  oputputDir: string;
}): Promise<void> {
  if (!path.isAbsolute(args.oputputDir)) {
    throw new Error(`Output path must be absolute, got "${args.oputputDir}"`);
  }
}
