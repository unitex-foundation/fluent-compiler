import type { FluentDateVariableOptions } from './fluent_date_variable_options.js';
import type { FluentEnumVariableOptions } from './fluent_enum_variable_options.js';
import type { FluentNumberVariableOptions } from './fluent_number_variable_options.js';
import type { FluentPluralVariableOptions } from './fluent_plural_variable_options.js';
type VariableOptions<VariableName extends string, VariableType extends string> = VariableType extends 'number' ? {
    [K in VariableName]?: FluentNumberVariableOptions;
} : VariableType extends 'plural' ? {
    [K in VariableName]?: FluentPluralVariableOptions;
} : VariableType extends 'datetime' ? {
    [K in VariableName]?: FluentDateVariableOptions;
} : VariableType extends 'enum' ? {
    [K in VariableName]: FluentEnumVariableOptions;
} : never;
type MessageOptions<M_V extends MessageValue> = M_V extends `${string}{${infer Variable}}${infer Rest}` ? Variable extends `${infer Name}:${infer Type}` ? // if has a variable with a type
VariableOptions<Name, Type> & MessageOptions<Rest> : MessageOptions<Rest> : unknown;
type MessageValue = string;
export declare function defineMessage<M_V extends MessageValue, M_O extends MessageOptions<M_V>>(value: M_V, options?: M_O): {
    value: M_V;
    options?: M_O;
};
export {};
//# sourceMappingURL=define_message.d.ts.map