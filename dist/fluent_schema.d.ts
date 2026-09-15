import type { FluentProvidedSchema } from './fluent_provided_schema.js';
import type { FluentMessageList } from './fluent_message_list.js';
export type FluentSchema = FluentProvidedSchema extends infer T ? T extends FluentMessageList ? T : never : FluentMessageList;
