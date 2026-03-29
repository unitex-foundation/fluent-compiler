import type { FluentDefinedMessage } from './fluent_defined_message.js';
import type { FluentMessageOptions } from './fluent_message_options.js';
import type { FluentSchemaContent } from './fluent_schema_content.js';
import type { FluentSchemaKey } from './fluent_schema_key.js';
import type { FluentVariableOptions } from './fluent_variable_options.js';
type VariableType<T extends string, V extends FluentVariableOptions['variants'] | undefined> = T extends 'number' | 'plural' ? number : T extends 'datetime' ? Date : T extends 'enum' ? V extends undefined ? never : keyof V : never;
type VariableArgs<M_V extends string, M_O extends FluentMessageOptions | undefined> = M_V extends `${string}{$${infer Variable}}${infer Rest}` ? Variable extends `${infer Name}:${infer Type}` ? // if has a variable with a type
{
    [K in Name]: VariableType<Type, M_O extends FluentMessageOptions ? M_O[`$${Name}`]['variants'] : never>;
} & VariableArgs<Rest, M_O> : // if has a variable without a type
{
    [K in Variable]: string | number;
} & VariableArgs<Rest, M_O> : unknown;
export type FluentSchemaArgsAtKey<K extends FluentSchemaKey> = FluentSchemaContent[K] extends string ? VariableArgs<FluentSchemaContent[K], undefined> : FluentSchemaContent[K] extends FluentDefinedMessage ? VariableArgs<FluentSchemaContent[K]['value'], FluentSchemaContent[K]['options']> : never;
export type FluentSchemaArgs = {
    [K in FluentSchemaKey]: FluentSchemaArgsAtKey<K> extends object ? FluentSchemaArgsAtKey<K> : never;
}[FluentSchemaKey];
export {};
