// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License
import { FluentMessageType } from './fluent_message_type';
import { isFluentMessageType } from './validators';
export function parseVariableType(args) {
    const safeName = args.name.includes('$')
        ? args.name.replace('$', '\\$')
        : args.name;
    const patternString = [
        '([\\s\\S]*?)',
        '(?<variable>(\\{',
        '([\\s]*?)',
        `(?<name>(${safeName}))`,
        ':',
        `(?<type>(${Object.values(FluentMessageType).join('|')}))`,
        '([\\s]*?)',
        '\\}))',
        '([\\s\\S]*?)',
    ].join('');
    const pattern = new RegExp(patternString);
    const match = args.messageBody.match(pattern);
    if (match === null || match.groups === undefined) {
        throw new Error(`Failed to parse type of variable "${args.name}" in the message:\n${args.messageBody}`);
    }
    const { name, type } = match.groups;
    if (name !== args.name) {
        throw new Error(`Unexpected parsed variable name in the message: ${args.messageBody}\n\n- Expected "${args.name}"\n- Received "${name}"`);
    }
    if (!isFluentMessageType(type)) {
        throw new Error(`Unexpected parsed type of variable "${args.name}" in the message: ${args.messageBody}`);
    }
    if (type === FluentMessageType.List) {
        throw new Error(`Unsupported type "${type}" of variable "${args.name}" in the message: ${args.messageBody}`);
    }
    return type;
}
export function searchVariableInstances(args) {
    const safeName = args.name.includes('$')
        ? args.name.replace('$', '\\$')
        : args.name;
    const patternString = [
        '([\\s\\S]*?)',
        '(?<variable>(\\{',
        '([\\s]*?)',
        `(?<name>(${safeName}))`,
        args.type !== undefined ? [':', `(?<type>(${args.type}))`] : undefined,
        '([\\s]*?)',
        '\\}))',
        '([\\s\\S]*?)',
    ]
        .flat()
        .filter((value) => value !== undefined)
        .join('');
    const pattern = new RegExp(patternString, 'g');
    const matches = [...args.messageBody.matchAll(pattern)];
    if (matches.length === 0) {
        throw new Error(`Failed to find variables with name "${args.name}" and type "${args.type}" in the message:\n${args.messageBody}`);
    }
    return matches.map((match) => {
        if (match.groups === undefined) {
            throw new Error(`Failed to parse type of variable "${args.name}" in the message:\n${args.messageBody}`);
        }
        const { variable, name, type } = match.groups;
        if (name !== args.name) {
            throw new Error(`Unexpected parsed variable name in the message: ${args.messageBody}\n\n- Expected "${args.name}"\n- Received "${name}"`);
        }
        if (type !== args.type) {
            throw new Error(`Unexpected parsed type of variable "${args.name}" in the message: ${args.messageBody}`);
        }
        return { variable, index: match.index + match[0].indexOf(variable) };
    });
}
//# sourceMappingURL=parser.js.map