import {expect} from 'chai';
import {IOHelper} from '../../../src/helpers/IOHelper';
import {FileNotFoundError} from '../../../src/errors/fileNotFoundError';
import {unlinkSync} from 'fs';

describe('IOHelper', () => {
  const ORIGINAL_STRING: string = '{\'test\': true}';
  const FILEPATH: string = 'testFile.json';

  describe('Save a string to a file', () => {
    it('Should save the file without any error', () => {
      const writeTest = () => {
        IOHelper.SaveStringToFile(FILEPATH, ORIGINAL_STRING);
      };
      expect(writeTest).to.not.throw();
    });
  });

  describe('Load a string from a file', () => {
    it('Should load an existing file without any error', () => {
      const readTest = () => {
        IOHelper.LoadStringFromFile(FILEPATH)   
      };

      expect(readTest).to.not.throw();    
    });

    it('Should throw an error on a non existing file', () => {
      const nonExistingPath: string = Math.random().toString(16);
      const readTest = () => {
        IOHelper.LoadStringFromFile(nonExistingPath)   
      };
      expect(readTest).to.throw(new FileNotFoundError(nonExistingPath).message);
    });

    it('Should match the string value that has been saved', () => {
      const loadedString: string = IOHelper.LoadStringFromFile(FILEPATH);
      expect(loadedString).to.equal(ORIGINAL_STRING);
    });
  });

  after(() => {
    unlinkSync(FILEPATH);
  });
});
