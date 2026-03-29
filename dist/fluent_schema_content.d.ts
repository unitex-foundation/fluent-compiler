import type { FluentSchema } from './fluent_schema.js';
import type { FluentMessageList } from './fluent_message_list.js';
export type FluentSchemaContent = FluentSchema extends {
    content: infer T;
} ? T extends infer MessageList ? MessageList : never : FluentMessageList;
