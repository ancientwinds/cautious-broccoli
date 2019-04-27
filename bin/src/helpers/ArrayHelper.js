"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayHelper = /** @class */ (function () {
    function ArrayHelper() {
    }
    ArrayHelper.RemoveDupplicate = function (array) {
        return Array.from(new Set(array));
    };
    return ArrayHelper;
}());
exports.ArrayHelper = ArrayHelper;
