import type { FluentDefinedMessage } from './fluent_defined_message';
import type { FluentLocalizationBase } from './fluent_localization_base';
import type { FluentMessageList } from './fluent_message_list';
import type { FluentMessageOptions } from './fluent_message_options';
import type { FluentVariableOptions } from './fluent_variable_options';
export type FluentBaseMessageList = FluentLocalizationBase extends {
    messageList: infer T;
} ? T extends infer MessageList ? MessageList : never : FluentMessageList;
export type FluentBaseMessageKey = keyof FluentBaseMessageList;
type StringWithVariable = `${string}{$${string}}${string}`;
export type FluentBaseMessageKeyWithVariables = {
    [K in FluentBaseMessageKey]: FluentBaseMessageList[K] extends StringWithVariable ? K : FluentBaseMessageList[K] extends FluentDefinedMessage ? FluentBaseMessageList[K]['value'] extends StringWithVariable ? K : never : never;
}[FluentBaseMessageKey];
export type FluentBaseMessageKeyWitoutVariables = {
    [K in FluentBaseMessageKey]: FluentBaseMessageList[K] extends `${string}{$${string}}${string}` ? never : FluentBaseMessageList[K] extends FluentDefinedMessage ? FluentBaseMessageList[K]['value'] extends StringWithVariable ? never : K : K;
}[FluentBaseMessageKey];
type VariableType<T extends string, V extends FluentVariableOptions['variants'] | undefined> = T extends 'number' | 'plural' ? number : T extends 'datetime' ? Date : T extends 'enum' ? V extends undefined ? never : keyof V : never;
type VariableArgs<M_V extends string, M_O extends FluentMessageOptions | undefined> = M_V extends `${string}{$${infer Variable}}${infer Rest}` ? Variable extends `${infer Name}:${infer Type}` ? // if has a variable with a type
{
    [K in Name]: VariableType<Type, M_O extends FluentMessageOptions ? M_O[`$${Name}`]['variants'] : never>;
} & VariableArgs<Rest, M_O> : // if has a variable without a type
{
    [K in Variable]: string | number;
} & VariableArgs<Rest, M_O> : unknown;
export type FluentBaseMessageArgsAtKey<K extends FluentBaseMessageKey> = FluentBaseMessageList[K] extends string ? VariableArgs<FluentBaseMessageList[K], undefined> : FluentBaseMessageList[K] extends FluentDefinedMessage ? VariableArgs<FluentBaseMessageList[K]['value'], FluentBaseMessageList[K]['options']> : never;
export type FluentBaseMessageArgs = {
    [K in FluentBaseMessageKey]: FluentBaseMessageArgsAtKey<K> extends object ? FluentBaseMessageArgsAtKey<K> : never;
}[FluentBaseMessageKey];
export type FluentMessageListBasedOn<T extends FluentMessageList> = {
    [K in keyof T]?: string | FluentDefinedMessage;
};
export {};
//# sourceMappingURL=type_casting.d.ts.map