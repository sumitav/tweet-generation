import { FileReader } from '../../main/utils/fileReader';
import { FileReadException } from '../../main/exceptions/FileReadException';
import * as fs from 'fs';

jest.mock('fs');

describe('FileReader', () => {
    const mockFilePath = '../../../reviews.json';

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw an error for invalid file path', () => {
        expect(() => FileReader.readJSON('')).toThrow(FileReadException);
        expect(() => FileReader.readJSON('invalid/path')).toThrow(FileReadException);
    });

    test('should throw an error if file does not exist', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        expect(() => FileReader.readJSON(mockFilePath)).toThrow(FileReadException);
    });

    test('should read and parse a valid JSON file', () => {
        const mockData = { key: 'value' };
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
        
        const result = FileReader.readJSON(mockFilePath);
        expect(result).toEqual(mockData);
    });

    test('should throw an error for invalid JSON format', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');

        expect(() => FileReader.readJSON(mockFilePath)).toThrow(FileReadException);
    });
    test('should log a warning and return an empty array when the JSON file is empty', () => {
        // Arrange
        (fs.readFileSync as jest.Mock).mockReturnValue('');
        const filePath = '../../../reviews.json';
        const result = FileReader.readJSON<any>(filePath);
        expect(result).toEqual([]); // Check that the return value is an empty array
    });

});
