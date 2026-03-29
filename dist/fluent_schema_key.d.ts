import type { FluentDefinedMessage } from './fluent_defined_message.js';
import type { FluentSchemaContent } from './fluent_schema_content.js';
export type FluentSchemaKey = keyof FluentSchemaContent;
type StringWithVariable = `${string}{$${string}}${string}`;
export type FluentSchemaKeyWithVariables = {
    [K in FluentSchemaKey]: FluentSchemaContent[K] extends StringWithVariable ? K : FluentSchemaContent[K] extends FluentDefinedMessage ? FluentSchemaContent[K]['value'] extends StringWithVariable ? K : never : never;
}[FluentSchemaKey];
export type FluentSchemaKeyWitoutVariables = {
    [K in FluentSchemaKey]: FluentSchemaContent[K] extends `${string}{$${string}}${string}` ? never : FluentSchemaContent[K] extends FluentDefinedMessage ? FluentSchemaContent[K]['value'] extends StringWithVariable ? never : K : K;
}[FluentSchemaKey];
export {};
