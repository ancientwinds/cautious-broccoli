"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessHelper = /** @class */ (function () {
    function ProcessHelper() {
    }
    ProcessHelper.ParseArguments = function () {
        var _a = process.argv, args = _a.slice(2);
        if (args.length === 1) {
            return args[0].split(',');
        }
        return args;
    };
    return ProcessHelper;
}());
exports.ProcessHelper = ProcessHelper;
