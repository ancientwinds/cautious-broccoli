"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __importDefault(require("./container"));
var injectableTypes_1 = require("./types/injectableTypes");
var helpers_1 = require("./helpers/helpers");
var application = container_1.default.get(injectableTypes_1.TYPES.IWeatherApplication);
application.run()
    .then(function () {
    helpers_1.LogHelper.LogEmptyLines(1);
    helpers_1.LogHelper.Goodbye();
    //process.exit(0);
})
    .catch(function (error) {
    helpers_1.LogHelper.Error("Oups... an unexpected error happened. Please contact the developper. (" + JSON.stringify(error) + ")");
    process.exit(0);
});
