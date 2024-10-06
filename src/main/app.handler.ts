import * as fs from 'fs';
import logger from './config/logger';
import { ServiceFactory } from './factories/ServiceFactory';
import { TweetController } from '../main/controllers/tweetController';

export class TweetApp {
    private reviewsFile: string = '';
    private moviesFile: string = '';

    constructor(private files: string[]) {}
    /**
     * method to validate the input arguments and specifying its location
     */
    public validateFiles(): void {
        if (this.files.length < 2) {
            logger.error('Please provide both reviews.json and movies.json as arguments.');
            process.exit(1);
        }

        this.files.forEach(file => {
            if (file.includes('reviews')) {
                this.reviewsFile = file;
            } else if (file.includes('movies')) {
                this.moviesFile = file;
            }
        });

        if (!this.reviewsFile || !this.moviesFile) {
            logger.error('Please ensure one file is reviews.json and the other is movies.json.');
            process.exit(1);
        }

        this.checkFileExistence(this.reviewsFile, 'Reviews');
        this.checkFileExistence(this.moviesFile, 'Movies');
    }
    /**
     * method to check if file exists
     * @param file 
     * @param fileType 
     */

    private checkFileExistence(file: string, fileType: string): void {
        if (!fs.existsSync(file)) {
            logger.error(`${fileType} file not found: ${file}`);
            process.exit(1);
        }
    }
    /**
     * main entry point of initializing the factory service
     */

    public run(): void {
        const reviewService = ServiceFactory.createReviewService(this.reviewsFile);
        const movieService = ServiceFactory.createMovieService(this.moviesFile);
        if (!movieService) {
            logger.error('MovieService initialization failed. Exiting the program.');
            return;
        }
        const tweetService = ServiceFactory.createTweetService();
        const fileService = ServiceFactory.createFileService();

        const tweetController = new TweetController(reviewService, movieService, tweetService, fileService);
        tweetController.generateTweets();
    }
}
