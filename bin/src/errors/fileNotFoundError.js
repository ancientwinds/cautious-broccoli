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
var FileNotFoundError = /** @class */ (function (_super) {
    __extends(FileNotFoundError, _super);
    function FileNotFoundError(filepath) {
        var _this = _super.call(this, 'FileNotFoundError') || this;
        _this.message = "Unable to find the file: " + filepath;
        return _this;
    }
    return FileNotFoundError;
}(Error));
exports.FileNotFoundError = FileNotFoundError;
