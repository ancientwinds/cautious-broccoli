"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var fileNotFoundError_1 = require("../errors/fileNotFoundError");
var IOHelper = /** @class */ (function () {
    function IOHelper() {
    }
    IOHelper.SaveStringToFile = function (filepath, stringToSave) {
        fs_1.writeFileSync(filepath, stringToSave);
    };
    IOHelper.LoadStringFromFile = function (filepath) {
        if (!fs_1.existsSync(filepath)) {
            throw new fileNotFoundError_1.FileNotFoundError(filepath);
        }
        return fs_1.readFileSync(filepath).toString('utf8');
    };
    return IOHelper;
}());
exports.IOHelper = IOHelper;
