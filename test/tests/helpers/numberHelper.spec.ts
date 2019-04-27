import {expect} from 'chai';
import {NumberHelper} from '../../../src/helpers/NumberHelper';

describe('NumberHelper', () => {
  describe('IsNumber', () => {
    it('Should return true on valid numbers', () => {
      expect(NumberHelper.IsNumber('0')).to.equal(true);    
      expect(NumberHelper.IsNumber('0.9')).to.equal(true);    
      expect(NumberHelper.IsNumber('-1')).to.equal(true);    
    });

    it('Should return false on invalid numbers', () => {
      expect(NumberHelper.IsNumber('0,1')).to.equal(false);    
      expect(NumberHelper.IsNumber('0abc')).to.equal(false);    
      expect(NumberHelper.IsNumber('abc')).to.equal(false);    
    });
  });
});
