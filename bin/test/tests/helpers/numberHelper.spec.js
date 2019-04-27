"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var NumberHelper_1 = require("../../../src/helpers/NumberHelper");
describe('NumberHelper', function () {
    describe('IsNumber', function () {
        it('Should return true on valid numbers', function () {
            chai_1.expect(NumberHelper_1.NumberHelper.IsNumber('0')).to.equal(true);
            chai_1.expect(NumberHelper_1.NumberHelper.IsNumber('0.9')).to.equal(true);
            chai_1.expect(NumberHelper_1.NumberHelper.IsNumber('-1')).to.equal(true);
        });
        it('Should return false on invalid numbers', function () {
            chai_1.expect(NumberHelper_1.NumberHelper.IsNumber('0,1')).to.equal(false);
            chai_1.expect(NumberHelper_1.NumberHelper.IsNumber('0abc')).to.equal(false);
            chai_1.expect(NumberHelper_1.NumberHelper.IsNumber('abc')).to.equal(false);
        });
    });
});
