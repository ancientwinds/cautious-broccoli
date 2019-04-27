"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var IOHelper_1 = require("../../../src/helpers/IOHelper");
var fileNotFoundError_1 = require("../../../src/errors/fileNotFoundError");
var fs_1 = require("fs");
describe('IOHelper', function () {
    var ORIGINAL_STRING = '{\'test\': true}';
    var FILEPATH = 'testFile.json';
    describe('Save a string to a file', function () {
        it('Should save the file without any error', function () {
            var writeTest = function () {
                IOHelper_1.IOHelper.SaveStringToFile(FILEPATH, ORIGINAL_STRING);
            };
            chai_1.expect(writeTest).to.not.throw();
        });
    });
    describe('Load a string from a file', function () {
        it('Should load an existing file without any error', function () {
            var readTest = function () {
                IOHelper_1.IOHelper.LoadStringFromFile(FILEPATH);
            };
            chai_1.expect(readTest).to.not.throw();
        });
        it('Should throw an error on a non existing file', function () {
            var nonExistingPath = Math.random().toString(16);
            var readTest = function () {
                IOHelper_1.IOHelper.LoadStringFromFile(nonExistingPath);
            };
            chai_1.expect(readTest).to.throw(new fileNotFoundError_1.FileNotFoundError(nonExistingPath).message);
        });
        it('Should match the string value that has been saved', function () {
            var loadedString = IOHelper_1.IOHelper.LoadStringFromFile(FILEPATH);
            chai_1.expect(loadedString).to.equal(ORIGINAL_STRING);
        });
    });
    after(function () {
        fs_1.unlinkSync(FILEPATH);
    });
});
