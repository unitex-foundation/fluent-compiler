// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License
import { FLUENT_MESSAGE_TYPES_SET, } from './fluent_message_type';
export function isFluentMessageType(value) {
    return FLUENT_MESSAGE_TYPES_SET.has(value);
}
//# sourceMappingURL=validators.js.map