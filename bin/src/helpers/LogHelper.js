"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var LogHelper = /** @class */ (function () {
    function LogHelper() {
    }
    LogHelper.Log = function (message) {
        console.log(message);
    };
    LogHelper.Warn = function (message) {
        console.log(chalk_1.default.bgYellow('WARNING: ') + " " + message);
    };
    LogHelper.Error = function (message) {
        console.log(chalk_1.default.bgRed('ERROR: ') + " " + message);
    };
    LogHelper.Goodbye = function () {
        console.log("" + chalk_1.default.bgBlue.white.bold('Goodbye! Hoping that the weather will be nice on you.'));
    };
    LogHelper.LogEmptyLines = function (numberOfEmptyLines) {
        for (var index = 0; index < numberOfEmptyLines; index++) {
            console.log('\n');
        }
    };
    return LogHelper;
}());
exports.LogHelper = LogHelper;
