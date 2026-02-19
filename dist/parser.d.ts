import { FluentVariableType } from './fluent_variable_type.js';
export declare function parseVariableType(args: {
    message: string;
    name: string;
}): FluentVariableType;
export declare function searchVariableInstances(args: {
    message: string;
    name: string;
    type?: FluentVariableType;
}): {
    variable: string;
    index: number;
}[];
