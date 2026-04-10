import type { FluentSchemaArgs } from './fluent_schema_args.js';
import type { FluentSchemaKey } from './fluent_schema_key.js';
import { FluentVariableType } from './fluent_variable_type.js';
export declare const FLUENT_SCHEMA_KEY_REGEXP: RegExp;
export declare function isFluentVariableType(value: unknown): value is FluentVariableType;
export declare function isFluentSchemaKey(key: unknown): key is FluentSchemaKey;
export declare function isFluentSchemaArgs(args: unknown): args is FluentSchemaArgs;
