import { TweetController } from '../main/controllers/tweetController'; // Ensure you have the correct path to TweetController
import logger from './config/logger';
import * as fs from 'fs';

const [reviewsFile, moviesFile] = process.argv.slice(2);

// Check if both files are provided
if (!reviewsFile || !moviesFile) {
    logger.error('Please provide both reviews.json and movies.json as arguments.');
    process.exit(1);
}

// Check if the review file exists
if (!fs.existsSync(reviewsFile)) {
    logger.error(`Reviews file not found: ${reviewsFile}`);
    process.exit(1);
}

// Check if the movie file exists
if (!fs.existsSync(moviesFile)) {
    logger.error(`Movies file not found: ${moviesFile}`);
    process.exit(1);
}

const tweetController = new TweetController(reviewsFile, moviesFile);
tweetController.generateTweets();
