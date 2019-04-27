"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberHelper = /** @class */ (function () {
    function NumberHelper() {
    }
    NumberHelper.IsNumber = function (value) {
        return !/[^-\.\d]/.test(value);
    };
    return NumberHelper;
}());
exports.NumberHelper = NumberHelper;
