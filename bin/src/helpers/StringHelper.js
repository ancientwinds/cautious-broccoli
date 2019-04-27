"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.RemoveSpecificTrailingCharacters = function (stringToEvaluate, charactersToRemove) {
        if (stringToEvaluate.endsWith(charactersToRemove)) {
            stringToEvaluate = stringToEvaluate.slice(0, charactersToRemove.length * -1);
        }
        return stringToEvaluate;
    };
    return StringHelper;
}());
exports.StringHelper = StringHelper;
