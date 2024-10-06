import logger from '../config/logger';
import { Constants } from '../constants/constants';
import { FileReadException } from '../exceptions/FileReadException';
import { FileSaveException } from '../exceptions/FileSaveException';
import { IFileService } from '../interfaces/file.service.interface';
import { IMovieService } from '../interfaces/movie.service.interface';
import { IReviewService } from '../interfaces/review.service.interface';
import { ITweetService } from '../interfaces/tweet.service.interface';

export class TweetController {
    private reviewService: IReviewService;
    private movieService: IMovieService;
    private tweetService: ITweetService;
    private fileService: IFileService;
    constructor(
        reviewService: IReviewService,
        movieService: IMovieService,
        tweetService: ITweetService,
        fileService: IFileService
    ) {
        this.reviewService = reviewService;
        this.movieService = movieService;
        this.tweetService = tweetService;
        this.fileService = fileService;
    }

    /**
     * Generates tweets and saves them to a file.
     */
    public generateTweets() {
        try {
            const tweets = this.collectTweets();
            if (tweets.length > 0) {
                this.fileService.saveTweets(tweets);
            } else {
                logger.warn('No tweets generated due to missing or invalid data.');
            }
        }catch (error) {
            if (error instanceof FileSaveException) {
                logger.error(`${Constants.FILE_SAVE_ERROR}: ${error.message}`);
            } else if (error instanceof FileReadException) {
                logger.error(`${Constants.FILE_READ_ERROR}: ${error.message}`);
            } else {
                logger.error(`${Constants.FAILED_TO_GENERATE_TWEETS}: ${error.message}`);
            }
            return;
        }
    }
      /**
     * Collects tweets based on reviews and corresponding movies.
     * @returns {string[]} An array of generated tweets.
     */
      private collectTweets(): string[] {
        const reviews = this.reviewService.getAllReviews();
        if (this.movieService.isEmpty()) {
            logger.error('No movie data available. Unable to generate tweets.');
            return [];
        }
        return reviews.map(review => {
            const movie = this.movieService.findMovieById(review.title);
            const year = movie ? movie.year : null;
            if (!movie) {
                logger.warn(`Movie data missing for: ${review.title}`);
            }
            return this.tweetService.generateTweet(review, year);
        });
    }
}
