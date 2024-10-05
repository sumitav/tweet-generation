import { FileService } from '../../main/services/file.service';
import { FileSaveException } from '../../main/exceptions/FileSaveException';
import * as fs from 'fs';
import * as path from 'path';
import { Constants } from '../../main/constants/constants';

jest.mock('fs');

describe('FileService', () => {
    const mockTweets = ['Tweet 1', 'Tweet 2', 'Tweet 3'];
    const fileService = new FileService();
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create output directory if it does not exist', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

        fileService.saveTweets(mockTweets);

        expect(fs.existsSync).toHaveBeenCalledWith(Constants.OUTPUT_DIR);
        expect(fs.mkdirSync).toHaveBeenCalledWith(Constants.OUTPUT_DIR, { recursive: true });
    });

    test('should save tweets to the output file', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

        const outputFile = path.join(Constants.OUTPUT_DIR, Constants.DEFAULT_TWEET_FILENAME);
        fileService.saveTweets(mockTweets);

        expect(fs.writeFileSync).toHaveBeenCalledWith(outputFile, JSON.stringify(mockTweets, null, 2));
    });

    test('should throw FileSaveException when an error occurs while saving', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {
            throw new Error('Write error');
        });

        expect(() => fileService.saveTweets(mockTweets)).toThrow(FileSaveException);
        expect(() => fileService.saveTweets(mockTweets)).toThrow('Failed to save tweets to file:');
    });
});
