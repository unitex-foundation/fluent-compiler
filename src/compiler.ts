// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License

import type { FluentMessageOptions } from 'src/fluent_message_options';
import { FluentMessageType } from 'src/fluent_message_type';
import type { FluentMessageValue } from 'src/fluent_message_value';
import { parseVariableType, searchVariableInstances } from 'src/parser';

export async function compile(
  messages: {
    [key: string]: FluentMessageValue;
  },
  isLoggingEnabled?: boolean,
): Promise<string> {
  if (isLoggingEnabled) {
    console.log('Compiling messages...:');
    console.log('\n', messages, '\n');
  }
  return Object.entries(messages)
    .map(([key, message]) => {
      const compiledMessage = compileMessageValue({
        message,
        isLoggingEnabled,
      });
      return `${key} = ${compiledMessage}`;
    })
    .join('\n');
}

function compileMessageValue(args: {
  message: FluentMessageValue;
  isLoggingEnabled?: boolean;
}): string {
  if (args.isLoggingEnabled) {
    console.log('Compiling message...:');
    console.log('\n', args.message, '\n');
  }
  let messageBody = args.message.value;
  const messageOptions = args.message.options;
  if (messageOptions === undefined) {
    if (args.isLoggingEnabled) {
      console.log('Result:');
      console.log('\n', messageBody, '\n');
    }
    return messageBody;
  }
  if (args.isLoggingEnabled) {
    console.log('Compiling variables...');
  }
  for (const [name, options] of Object.entries(messageOptions)) {
    messageBody = compileVariable({
      ...args,
      messageBody,
      name,
      options,
    });
  }
  return messageBody;
}

function compileVariable(args: {
  messageBody: string;
  name: string;
  options: FluentMessageOptions;
  isLoggingEnabled?: boolean;
}): string {
  if (args.isLoggingEnabled) {
    console.log(`Compiling variable "${args.name}"`);
    console.log('Parsing type...');
  }
  const type = parseVariableType({
    messageBody: args.messageBody,
    name: args.name,
  });
  if (args.isLoggingEnabled) {
    console.log(`Variable "${args.name}" has type "${type}"`);
    console.log('Looking for matches...');
  }
  const instances = searchVariableInstances({
    messageBody: args.messageBody,
    name: args.name,
    type,
  });
  if (args.isLoggingEnabled) {
    console.log('Found matches:');
    console.log(instances);
    console.log('Compiling variable instances...');
  }
  let messageBody = args.messageBody;
  let offset = 0;
  for (const instance of instances) {
    messageBody = compileVariableInstance({
      ...args,
      messageBody,
      type,
      variable: instance.variable,
      index: instance.index + offset,
    });
    offset = args.messageBody.length - messageBody.length;
  }
  return messageBody;
}

function compileVariableInstance(args: {
  messageBody: string;
  variable: string;
  name: string;
  type: FluentMessageType;
  index: number;
  options: FluentMessageOptions;
  isLoggingEnabled?: boolean;
}): string {
  if (args.isLoggingEnabled) {
    console.log(
      `Compiling variable "${args.variable}" instance at index "${args.index}"`,
    );
    console.log('Parsing type...');
  }
  const shortVariable = convertToShortVariableName(args);
  const functionalVariable = convertToFunctionalVariable({
    ...args,
    variable: shortVariable,
  });
  const sliceBefore = args.messageBody.slice(0, args.index);
  const sliceAfter = args.messageBody.slice(args.index + args.variable.length);
  const messageBody = sliceBefore + functionalVariable + sliceAfter;
  if (args.isLoggingEnabled) {
    console.log(`Updated message body:\n\n${messageBody}\n\n`);
  }
  return messageBody;
}

function convertToShortVariableName(args: {
  variable: string;
  name: string;
  type: FluentMessageType;
  isLoggingEnabled?: boolean;
}): string {
  const variable = args.variable.replace(`:${args.type}`, '');
  if (args.isLoggingEnabled) {
    console.log(`Converted variable from "${args.variable}" to "${variable}"`);
  }
  return variable;
}

function convertToFunctionalVariable(args: {
  variable: string;
  name: string;
  type: FluentMessageType;
  options: FluentMessageOptions;
  isLoggingEnabled?: boolean;
}): string {
  if (args.type === FluentMessageType.List) {
    throw new Error(
      `Unsupported type "${args.type}" of variable "${args.variable}"`,
    );
  }
  if (
    args.type === FluentMessageType.Plural ||
    args.type === FluentMessageType.Enum
  ) {
    return args.variable;
  }
  const optionParams = 'params' in args.options ? args.options.params : [];
  const functionParams =
    optionParams !== undefined
      ? Object.entries(optionParams)
          .map(([key, value]) => {
            if (value === undefined) {
              return undefined;
            }
            if (typeof value === 'number') {
              return `${key}: ${value}`;
            }
            if (typeof value === 'string') {
              return `${key}: "${value}"`;
            }
            throw new Error(
              `Unexpected function parameter of the variable "${args.variable}"`,
            );
          })
          .filter((value) => value !== undefined)
      : [];
  const replacement = [
    args.type.toUpperCase(),
    '(',
    [args.name, ...functionParams.join(', ')]
      .filter((value) => value !== undefined)
      .join(', '),
    ')',
  ]
    .filter((value) => value !== undefined)
    .join('');
  const variable = args.variable.replace(args.name, replacement);
  if (args.isLoggingEnabled) {
    console.log(`Converted variable from "${args.variable}" to "${variable}"`);
  }
  return variable;
}
