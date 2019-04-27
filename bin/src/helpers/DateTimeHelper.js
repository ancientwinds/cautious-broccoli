"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateTimeHelper = /** @class */ (function () {
    function DateTimeHelper() {
    }
    DateTimeHelper.GetLocalTimeForOffset = function (offsetInHours) {
        var currentOffsetInMiliseconds = new Date().getTimezoneOffset() * 60 * 1000;
        var offsetInMiliseconds = offsetInHours * 60 * 60 * 1000;
        return Date.now() + currentOffsetInMiliseconds + offsetInMiliseconds;
    };
    DateTimeHelper.FormatDateTime = function (epochDateTime) {
        return new Date(epochDateTime).toISOString().slice(0, 16).replace('T', ' ');
    };
    return DateTimeHelper;
}());
exports.DateTimeHelper = DateTimeHelper;
