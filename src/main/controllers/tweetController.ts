import { ReviewService } from '../services/review.service';
import { MovieService } from '../services/movie.service';
import { TweetService } from '../services/tweet.service';
import logger from '../config/logger';
import * as fs from 'fs';
import path from 'path';

export class TweetController {
    private reviewService: ReviewService;
    private movieService: MovieService;
    private tweetService: TweetService;
    /**
     * 
     * @param reviewsFile 
     * @param moviesFile 
     */
    constructor(reviewsFile: string, moviesFile: string) {
        this.reviewService = new ReviewService(reviewsFile);
        this.movieService = new MovieService(moviesFile);
        this.tweetService = new TweetService();
    }
    /**
     * 
     */
    public generateTweets() {
        const tweets = this.collectTweets(); // Collect tweets in a separate private method
        this.saveTweets(tweets); // Save tweets in a separate private method
    }
    /**
     * 
     * @returns 
     */
    private collectTweets(): string[] {
        const reviews = this.reviewService.getAllReviews();
        const tweets: string[] = [];

        reviews.forEach(review => {
            const movie = this.movieService.findMovieById(review.title);
            const year = movie ? movie.year : 0;
            const tweet = this.tweetService.generateTweet(review, year);
            tweets.push(tweet);
        });

        return tweets;
    }
    /**
     * 
     * @param tweets 
     */
    private saveTweets(tweets: string[]) {
        const outputDir = path.join(process.cwd(), 'src/main/data'); // Change to use process.cwd()
        const outputFile = path.join(outputDir, 'output_tweet.json');

        // Check if the output directory exists and create it if it doesn't
        if (!fs.existsSync(outputDir)) {
            logger.info(`Creating directory: ${outputDir}`);
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write tweets to the output file
        try {
            fs.writeFileSync(outputFile, JSON.stringify(tweets, null, 2));
            logger.info('Tweets generated and saved to output_tweet.json');
        } catch (error) {
            logger.error(`Error writing to file: ${error.message}`);
        }
    }
}
