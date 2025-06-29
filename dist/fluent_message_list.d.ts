import type { FluentDefinedMessage } from './fluent_defined_message.js';
export type FluentMessageList = {
    [key: string]: string | FluentDefinedMessage;
};
export type FluentMessageListWithKeys<Key extends string> = Record<Key, string | FluentDefinedMessage>;
export type FluentMessageListWithPrefix<Prefix extends string, Key extends string = string> = Record<`${Prefix}_${Key}`, string | FluentDefinedMessage>;
//# sourceMappingURL=fluent_message_list.d.ts.map