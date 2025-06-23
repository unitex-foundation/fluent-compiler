import { FluentMessageType } from './fluent_message_type';
export declare function parseVariableType(args: {
    messageBody: string;
    name: string;
}): FluentMessageType;
export declare function searchVariableInstances(args: {
    messageBody: string;
    name: string;
    type?: FluentMessageType;
}): {
    variable: string;
    index: number;
}[];
//# sourceMappingURL=parser.d.ts.map