import type { FluentMessageValue } from './fluent_message_value.js';
type ExpectedKey = undefined | null | boolean | number | bigint | string;
export type FluentMessageList = {
    [key: string]: FluentMessageValue;
};
export type FluentMessageListWithPrefix<P extends string> = Record<`${P}${string}`, FluentMessageValue>;
export type FluentMessageListWithEnum<T extends string> = {
    [V in T]: FluentMessageValue;
};
export type FluentMessageListWithArray<T extends string[] | readonly string[]> = {
    [V in T[number]]: FluentMessageValue;
};
export type FluentMessageListWithObjectKeys<T extends {
    [key: string]: string;
}> = {
    [K in keyof T]: FluentMessageValue;
};
export type FluentMessageListWithObjectValues<T extends {
    [key: string]: string;
}> = {
    [K in keyof T as T[K]]: FluentMessageValue;
};
export type FluentMessageListWithPrefixedEnum<T extends string, P extends string> = {
    [V in T as `${P}${V}`]: FluentMessageValue;
};
export type FluentMessageListWithPrefixedArray<T extends string[] | readonly string[], P extends string> = {
    [V in T[number] as `${P}${V}`]: FluentMessageValue;
};
export type FluentMessageListWithPrefixedObjectKeys<T extends {
    [key: string]: string;
}, P extends string> = {
    [K in Extract<keyof T, ExpectedKey> as `${P}${K}`]: FluentMessageValue;
};
export type FluentMessageListWithPrefixedObjectValues<T extends {
    [key: string]: string;
}, P extends string> = {
    [K in keyof T as `${P}${T[K]}`]: FluentMessageValue;
};
export type FluentMessageListBasedOn<T extends FluentMessageList> = {
    [K in keyof T]?: FluentMessageValue;
};
export declare function defineFluentMessageListWithPrefix<T extends FluentMessageList, P extends string>(list: T, prefix: P): {
    [K in Extract<keyof T, ExpectedKey> as `${P}${K}`]: T[K];
};
export {};
