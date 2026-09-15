import type { FluentDefinedMessage } from './fluent_defined_message.js';
import type { FluentSchema } from './fluent_schema.js';
export type FluentSchemaKey = keyof FluentSchema;
type StringWithVariable = `${string}{$${string}}${string}`;
export type FluentSchemaKeyWithVariables = {
    [K in FluentSchemaKey]: FluentSchema[K] extends StringWithVariable ? K : FluentSchema[K] extends FluentDefinedMessage ? FluentSchema[K]['value'] extends StringWithVariable ? K : never : never;
}[FluentSchemaKey];
export type FluentSchemaKeyWitoutVariables = {
    [K in FluentSchemaKey]: FluentSchema[K] extends `${string}{$${string}}${string}` ? never : FluentSchema[K] extends FluentDefinedMessage ? FluentSchema[K]['value'] extends StringWithVariable ? never : K : K;
}[FluentSchemaKey];
export {};
