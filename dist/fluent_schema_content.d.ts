import type { FluentSchema } from './fluent_schema.js';
import type { FluentMessageList } from './fluent_message_list.js';
export type FluentSchemaContent = FluentSchema extends infer T ? T extends FluentMessageList ? T : never : FluentMessageList;
