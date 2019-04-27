"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidArgumentsError = /** @class */ (function (_super) {
    __extends(InvalidArgumentsError, _super);
    function InvalidArgumentsError(location) {
        var _this = _super.call(this, 'InvalidArgumentsError') || this;
        _this.message = "The arguments provided are not valid. Make sure you specify locations (zip/postal codes, city, lat/long) separated by comas. Also make sure you specify at least one location.";
        return _this;
    }
    return InvalidArgumentsError;
}(Error));
exports.InvalidArgumentsError = InvalidArgumentsError;
