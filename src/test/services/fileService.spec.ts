import { FileService } from '../../main/services/file.service';
import { FileSaveException } from '../../main/exceptions/FileSaveException';
import * as fs from 'fs';
import * as path from 'path';
import { Constants } from '../../main/constants/constants';

jest.mock('fs');
const originalOutputDir = Constants.OUTPUT_DIR;
const originalDefaultTweetFilename = Constants.DEFAULT_TWEET_FILENAME;

describe('FileService', () => {
    const mockTweets = ['Tweet 1', 'Tweet 2', 'Tweet 3'];
    const testOutputDir = 'test/output';
    const testFileName = 'test_tweets.json';
    const testFilePath = path.join(testOutputDir, testFileName);

    const fileService = new FileService();
    
    beforeEach(() => {
        (Constants as any).OUTPUT_DIR = testOutputDir;
        (Constants as any).DEFAULT_TWEET_FILENAME = testFileName;
        if (fs.existsSync(testOutputDir)) {
            fs.rmdirSync(testOutputDir, { recursive: true });
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
        (Constants as any).OUTPUT_DIR = originalOutputDir;
        (Constants as any).DEFAULT_TWEET_FILENAME = originalDefaultTweetFilename;

        if (fs.existsSync(testOutputDir)) {
            fs.rmdirSync(testOutputDir, { recursive: true });
        }
    });

    test('should create test output directory if it does not exist', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

        fileService.saveTweets(mockTweets);

        expect(fs.existsSync).toHaveBeenCalledWith(testOutputDir);
        expect(fs.mkdirSync).toHaveBeenCalledWith(testOutputDir, { recursive: true });
    });

    test('should save tweets to the test output file', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

        fileService.saveTweets(mockTweets);

        expect(fs.writeFileSync).toHaveBeenCalledWith(testFilePath, JSON.stringify(mockTweets, null, 2));
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
