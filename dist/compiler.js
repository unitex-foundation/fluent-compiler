// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License
import { FluentMessageType } from './fluent_message_type';
import { parseVariableType, searchVariableInstances } from './parser';
// TODO:
// - support attributes
// - support linked attributes
// - support namespaces
export function compile(messages, isLoggingEnabled) {
    if (isLoggingEnabled) {
        console.log('Begin: Compiling messages:');
        console.log(messages);
    }
    const result = Object.entries(messages)
        .map(([key, message]) => {
        const compiledMessage = compileMessageValue({
            message,
            isLoggingEnabled,
        });
        return `${key} = ${compiledMessage}`;
    })
        .join('\n');
    if (isLoggingEnabled) {
        console.log('End: Compiled messages:');
        console.log(result);
    }
    return result;
}
function compileMessageValue(args) {
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
    let messageBody = args.message.value;
    const messageOptions = args.message.options;
    if (messageOptions === undefined) {
        if (args.isLoggingEnabled) {
            console.log('Result: Compiled message:');
            console.log('- From');
            console.log(args.message);
            console.log('- To');
            console.log(messageBody);
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
    if (args.isLoggingEnabled) {
        console.log('Result: Compiled message:');
        console.log('- From');
        console.log(args.message);
        console.log('- To');
        console.log(messageBody);
    }
    return messageBody;
}
function compileVariable(args) {
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
function compileVariableInstance(args) {
    if (args.isLoggingEnabled) {
        console.log(`Compiling variable "${args.variable}" instance at index "${args.index}"`);
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
    const sliceBefore = args.messageBody.slice(0, args.index);
    const sliceAfter = args.messageBody.slice(args.index + args.variable.length);
    const messageBody = sliceBefore + selectableVariable + sliceAfter;
    if (args.isLoggingEnabled) {
        console.log('Updated message body:');
        console.log('- From');
        console.log(args.messageBody);
        console.log('- To');
        console.log(messageBody);
    }
    return messageBody;
}
function convertToShortVariableName(args) {
    const variable = args.variable.replace(`:${args.type}`, '');
    if (args.isLoggingEnabled) {
        console.log(`Converted variable from "${args.variable}" to "${variable}"`);
    }
    return variable;
}
function convertToFunctionalVariable(args) {
    if (args.type === FluentMessageType.List) {
        throw new Error(`Unsupported type "${args.type}" of variable "${args.variable}"`);
    }
    if (args.type === FluentMessageType.Plural ||
        args.type === FluentMessageType.Enum) {
        return args.variable;
    }
    const optionParams = 'params' in args.options ? args.options.params : [];
    const functionParams = optionParams !== undefined
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
            throw new Error(`Unexpected function parameter of the variable "${args.variable}"`);
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
function convertToSelectableVariable(args) {
    const variants = args.options.variants;
    if (variants === undefined) {
        return args.variable;
    }
    const [name] = args.name.split('.');
    const defaultIndex = args.options.defaultVariant !== undefined
        ? Object.keys(variants).indexOf(args.options.defaultVariant.toString())
        : 0;
    if (defaultIndex === -1) {
        throw new Error(`Unexpected default variants "${args.options.defaultVariant}", expected variants are "${Object.keys(variants).join(', ')}"`);
    }
    const selectors = Object.entries(variants)
        .map(([key, value], index) => {
        if (value === undefined) {
            throw new Error(`Select option "${key}" for variable "${args.variable}" is undefined`);
        }
        const prefix = `   ${index === defaultIndex ? '*' : ' '}`;
        const selectValue = value.replaceAll('{$}', `{${name}}`);
        return `${prefix}[${key}] ${selectValue}`;
    })
        .join('\n');
    return args.variable.replace('}', ` ->\n${selectors}\n  }`);
}
//# sourceMappingURL=compiler.js.map