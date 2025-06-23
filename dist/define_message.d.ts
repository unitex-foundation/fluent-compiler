import type { FluentDateMessageOptions } from './fluent_date_message_options';
import type { FluentEnumMessageOptions } from './fluent_enum_message_options';
import type { FluentListMessageOptions } from './fluent_list_message_options';
import type { FluentNumberMessageOptions } from './fluent_number_message_options';
import type { FluentPluralMessageOptions } from './fluent_plural_message_options';
type ParseOptionType<ParamType extends string, ParamName extends string> = ParamType extends 'number' ? {
    [K in ParamName]?: FluentNumberMessageOptions;
} : ParamType extends 'plural' ? {
    [K in ParamName]?: FluentPluralMessageOptions;
} : ParamType extends 'datetime' ? {
    [K in ParamName]?: FluentDateMessageOptions;
} : ParamType extends 'enum' ? {
    [K in ParamName]: FluentEnumMessageOptions;
} : ParamType extends 'list' ? {
    [K in ParamName]?: FluentListMessageOptions;
} : never;
type ExtractParamOptions<K extends string> = K extends `${string}{${infer Param}}${infer Rest}` ? Param extends `${infer Name}:${infer Type}` ? // if has a parameter with a type
ParseOptionType<Type, Name> & ExtractParamOptions<Rest> : ExtractParamOptions<Rest> : unknown;
export declare function defineMessage<K extends string, O extends ExtractParamOptions<K>>(value: K, options: O): {
    value: K;
    options: O;
};
export {};
//# sourceMappingURL=define_message.d.ts.map