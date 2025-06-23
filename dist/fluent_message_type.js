// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License
export var FluentMessageType;
(function (FluentMessageType) {
    FluentMessageType["Datetime"] = "datetime";
    FluentMessageType["Enum"] = "enum";
    FluentMessageType["List"] = "list";
    FluentMessageType["Number"] = "number";
    FluentMessageType["Plural"] = "plural";
})(FluentMessageType || (FluentMessageType = {}));
export const FLUENT_MESSAGE_TYPES_SET = Object.freeze(new Set(Object.values(FluentMessageType)));
//# sourceMappingURL=fluent_message_type.js.map