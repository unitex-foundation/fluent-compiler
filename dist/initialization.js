// Copyright (c) 2025 Grigorii Lutkov <friend.lga@gmail.com>
// Copyright (c) fluent-compiler contributors
// Licensed under the MIT License
//
// Inspired by WebDevSimplified
// https://github.com/WebDevSimplified/intl-crash-course
let _localizationHandler = undefined;
export function setLocalizationHandler(handler) {
    _localizationHandler = handler;
}
export function t(key, args) {
    if (_localizationHandler === undefined) {
        throw new Error('Localization Handler has not been set.\nYou need to provide handler using "setLocalizationHandler" function');
    }
    return _localizationHandler(key, args);
}
//# sourceMappingURL=initialization.js.map