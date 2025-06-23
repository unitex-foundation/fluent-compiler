// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import { FluentMessageType } from 'src/fluent_message_type';
import { isFluentMessageType } from 'src/validators';

export function parseVariableType(args: {
  messageBody: string;
  name: string;
}): FluentMessageType {
  const pattern = new RegExp(
    [
      '([\\s\\S]*?)',
      '(<variable>(\\{',
      '([\\s]*?)',
      `(<name>(${args.name}))`,
      ':',
      `(<type>(${Object.values(FluentMessageType).join('|')}))`,
      '([\\s]*?)',
      ')\\})',
      '([\\s\\S]*?)',
    ].join(''),
  );
  const match = args.messageBody.match(pattern);
  if (match === null || match.groups === undefined) {
    throw new Error(
      `Failed to parse type of variable "${args.name}" in the message:\n${args.messageBody}`,
    );
  }
  const { name, type } = match.groups;
  if (name !== args.name) {
    throw new Error(
      `Unexpected parsed variable name in the message: ${args.messageBody}\n\n- Expected "${args.name}"\n- Received "${name}"`,
    );
  }
  if (!isFluentMessageType(type)) {
    throw new Error(
      `Unexpected parsed type of variable "${args.name}" in the message: ${args.messageBody}`,
    );
  }
  if (type === FluentMessageType.List) {
    throw new Error(
      `Unsupported type "${type}" of variable "${args.name}" in the message: ${args.messageBody}`,
    );
  }
  return type;
}

export function searchVariableInstances(args: {
  messageBody: string;
  name: string;
  type?: FluentMessageType;
}): { variable: string; index: number }[] {
  const pattern = new RegExp(
    [
      '([\\s\\S]*?)',
      '(<variable>(\\{',
      '([\\s]*?)',
      `(<name>(${args.name}))`,
      args.type !== undefined ? [':', `(<type>(${args.name})`] : undefined,
      '([\\s]*?)',
      ')\\})',
      '([\\s\\S]*?)',
    ]
      .flat()
      .filter((value) => value !== undefined)
      .join(''),
  );
  const matches = [...args.messageBody.matchAll(pattern)];
  if (matches.length === 0) {
    throw new Error(
      `Failed to find variables with name "${args.name}" and type "${args.type}" in the message:\n${args.messageBody}`,
    );
  }
  return matches.map((match) => {
    if (match.groups === undefined) {
      throw new Error(
        `Failed to parse type of variable "${args.name}" in the message:\n${args.messageBody}`,
      );
    }
    const { variable, name, type } = match.groups;
    if (name !== args.name) {
      throw new Error(
        `Unexpected parsed variable name in the message: ${args.messageBody}\n\n- Expected "${args.name}"\n- Received "${name}"`,
      );
    }
    if (type !== args.type) {
      throw new Error(
        `Unexpected parsed type of variable "${args.name}" in the message: ${args.messageBody}`,
      );
    }
    return { variable, index: match.index };
  });
}
