// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) Fluent Compiler Contributors
// Licensed under the MIT License

import type { FluentVariableOptions } from 'fluent_variable_options';
import { FluentVariableType } from 'fluent_variable_type';
import { parseVariableType, searchVariableInstances } from 'parser';
import type { FluentMessageList } from 'fluent_message_list';
import type { FluentMessageValue } from 'fluent_message_value';

// TODO:
// - support attributes
// - support linked attributes
// - support namespaces

export function compile(
  messageList: FluentMessageList,
  isLoggingEnabled?: boolean,
): string {
  if (isLoggingEnabled) {
    console.log('Begin: Compiling message list:');
    console.log(messageList);
  }
  const result = Object.entries(messageList)
    .map(([key, message]) => {
      const compiledMessage = compileMessageValue({
        message,
        isLoggingEnabled,
      });
      return `${key} = ${compiledMessage}`;
    })
    .join('\n');
  if (isLoggingEnabled) {
    console.log('End: Compiled message list:');
    console.log(result);
  }
  return result;
}

function compileMessageValue(args: {
  message: FluentMessageValue;
  isLoggingEnabled?: boolean;
}): string {
  if (args.isLoggingEnabled) {
    console.log('Compiling message:');
    console.log(args.message);
  }
  if (typeof args.message === 'string') {
    if (args.isLoggingEnabled) {
      console.log('Result: Compiled message:');
      console.log('- From');
      console.log(args.message);
      console.log('- To');
      console.log(args.message);
    }
    return args.message;
  }
  let messageValue = args.message.value;
  const messageOptions = args.message.options;
  if (messageOptions === undefined) {
    if (args.isLoggingEnabled) {
      console.log('Result: Compiled message:');
      console.log('- From');
      console.log(args.message);
      console.log('- To');
      console.log(messageValue);
    }
    return messageValue;
  }
  if (args.isLoggingEnabled) {
    console.log('Compiling variables...');
  }
  for (const [name, options] of Object.entries(messageOptions)) {
    messageValue = compileVariable({
      ...args,
      messageValue,
      name,
      options,
    });
  }
  if (args.isLoggingEnabled) {
    console.log('Result: Compiled message:');
    console.log('- From');
    console.log(args.message);
    console.log('- To');
    console.log(messageValue);
  }
  return messageValue;
}

function compileVariable(args: {
  messageValue: string;
  name: string;
  options: FluentVariableOptions;
  isLoggingEnabled?: boolean;
}): string {
  if (args.isLoggingEnabled) {
    console.log(`Compiling variable "${args.name}"`);
    console.log('Parsing type...');
  }
  const type = parseVariableType({
    message: args.messageValue,
    name: args.name,
  });
  if (args.isLoggingEnabled) {
    console.log(`Variable "${args.name}" has type "${type}"`);
    console.log('Looking for matches...');
  }
  const instances = searchVariableInstances({
    message: args.messageValue,
    name: args.name,
    type,
  });
  if (args.isLoggingEnabled) {
    console.log('Found matches:');
    console.log(instances);
    console.log('Compiling variable instances...');
  }
  let messageValue = args.messageValue;
  let offset = 0;
  for (const instance of instances) {
    messageValue = compileVariableInstance({
      ...args,
      messageValue,
      type,
      variable: instance.variable,
      index: instance.index + offset,
    });
    offset = args.messageValue.length - messageValue.length;
  }
  return messageValue;
}

function compileVariableInstance(args: {
  messageValue: string;
  variable: string;
  name: string;
  type: FluentVariableType;
  index: number;
  options: FluentVariableOptions;
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
  const selectableVariable = convertToSelectableVariable({
    ...args,
    variable: functionalVariable,
  });
  const sliceBefore = args.messageValue.slice(0, args.index);
  const sliceAfter = args.messageValue.slice(args.index + args.variable.length);
  const messageValue = sliceBefore + selectableVariable + sliceAfter;
  if (args.isLoggingEnabled) {
    console.log('Updated message body:');
    console.log('- From');
    console.log(args.messageValue);
    console.log('- To');
    console.log(messageValue);
  }
  return messageValue;
}

function convertToShortVariableName(args: {
  variable: string;
  name: string;
  type: FluentVariableType;
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
  type: FluentVariableType;
  options: FluentVariableOptions;
  isLoggingEnabled?: boolean;
}): string {
  if (
    args.type === FluentVariableType.Plural ||
    args.type === FluentVariableType.Enum
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
    [args.name, ...functionParams]
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

function convertToSelectableVariable(args: {
  variable: string;
  name: string;
  type: FluentVariableType;
  options: FluentVariableOptions;
  isLoggingEnabled?: boolean;
}): string {
  const variants = args.options.variants;
  if (variants === undefined) {
    return args.variable;
  }
  const [name] = args.name.split('.');
  const defaultIndex =
    args.options.defaultVariant !== undefined
      ? Object.keys(variants).indexOf(args.options.defaultVariant.toString())
      : 0;
  if (defaultIndex === -1) {
    throw new Error(
      `Unexpected default variants "${args.options.defaultVariant}", expected variants are "${Object.keys(variants).join(', ')}"`,
    );
  }
  const selectors = Object.entries(variants)
    .map(([key, value], index) => {
      if (value === undefined) {
        throw new Error(
          `Select option "${key}" for variable "${args.variable}" is undefined`,
        );
      }
      const prefix = `   ${index === defaultIndex ? '*' : ' '}`;
      const selectValue = value.replaceAll('{$}', `{${name}}`);
      return `${prefix}[${key}] ${selectValue}`;
    })
    .join('\n');
  return args.variable.replace('}', ` ->\n${selectors}\n  }`);
}
