// SPDX-License-Identifier: MIT
// Copyright (c) 2025 Grigorii Lutkov <grigorii@lutkov.dev>
// Copyright (c) UNITEX Fluent Compiler Contributors
// See README.md, COPYING.md, CONTRIBUTING.md and CONTRIBUTORS.md for details
import { FluentVariableType } from './fluent_variable_type.js';
import { isFluentVariableType } from './validators.js';
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
        `(?<type>(${Object.values(FluentVariableType).join('|')}))`,
        '([\\s]*?)',
        '\\}))',
        '([\\s\\S]*?)',
    ].join('');
    const pattern = new RegExp(patternString);
    const match = args.message.match(pattern);
    if (match === null || match.groups === undefined) {
        throw new Error(`Failed to parse type of variable "${args.name}" in the message:\n${args.message}`);
    }
    const { name, type } = match.groups;
    if (name !== args.name) {
        throw new Error(`Unexpected parsed variable name in the message: ${args.message}\n\n- Expected "${args.name}"\n- Received "${name}"`);
    }
    if (!isFluentVariableType(type)) {
        throw new Error(`Unexpected parsed type of variable "${args.name}" in the message: ${args.message}`);
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
    const matches = [...args.message.matchAll(pattern)];
    if (matches.length === 0) {
        throw new Error(`Failed to find variables with name "${args.name}" and type "${args.type}" in the message:\n${args.message}`);
    }
    return matches.map((match) => {
        if (match.groups === undefined) {
            throw new Error(`Failed to parse type of variable "${args.name}" in the message:\n${args.message}`);
        }
        const { variable, name, type } = match.groups;
        if (name !== args.name) {
            throw new Error(`Unexpected parsed variable name in the message: ${args.message}\n\n- Expected "${args.name}"\n- Received "${name}"`);
        }
        if (type !== args.type) {
            throw new Error(`Unexpected parsed type of variable "${args.name}" in the message: ${args.message}`);
        }
        return { variable, index: match.index + match[0].indexOf(variable) };
    });
}
