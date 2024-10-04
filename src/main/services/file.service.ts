import * as fs from 'fs';
import * as path from 'path';
import logger from '../config/logger';
import { IFileService } from '../interfaces/file.service.interface';
import { Constants } from '../constants/constants';
import { FileSaveException } from '../exceptions/FileSaveException';

export class FileService implements IFileService {
    /**
     * Saves tweets to a specified file in the output directory.
     * @param tweets Array of tweets to save.
     * @param fileName Name of the output file.
     */
    public saveTweets(tweets: string[]) {
        const outputFile = path.join(Constants.OUTPUT_DIR, Constants.DEFAULT_TWEET_FILENAME);

        // Check if directory exists, create it if not
        if (!fs.existsSync(Constants.OUTPUT_DIR)) {
            logger.info('Creating output directory');
            fs.mkdirSync(Constants.OUTPUT_DIR, { recursive: true });
        }

        // Write tweets to file
        try {
            fs.writeFileSync(outputFile, JSON.stringify(tweets, null, 2));
            logger.info(`Tweets successfully saved as ${Constants.DEFAULT_TWEET_FILENAME}`);
        } catch (error) {
            logger.error(`Error saving tweets to file: ${error.message}`);
            throw new FileSaveException(`Failed to save tweets to file: ${outputFile}`);
        }
    }
}
