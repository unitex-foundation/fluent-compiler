import type { FluentSchemaKey } from './fluent_schema_key.js';
import { FluentVariableType } from './fluent_variable_type.js';
export declare const FLUENT_SCHEMA_KEY_REGEXP: RegExp;
export declare function isFluentVariableType(value: unknown): value is FluentVariableType;
export declare function isFluentSchemaKey(value: unknown): value is FluentSchemaKey;
