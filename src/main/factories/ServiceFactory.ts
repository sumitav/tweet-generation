import { ReviewService } from '../services/review.service';
import { MovieService } from '../services/movie.service';
import { TweetService } from '../services/tweet.service';
import { FileService } from '../services/file.service';

export class ServiceFactory {
    /**
     * Creates an instance of ReviewService.
     * @param reviewsFile - The path to the reviews JSON file.
     * @returns An instance of ReviewService.
     */
    static createReviewService(reviewsFile: string): ReviewService {
        return new ReviewService(reviewsFile);
    }

    /**
     * Creates an instance of MovieService.
     * @param moviesFile - The path to the movies JSON file.
     * @returns An instance of MovieService.
     */
    static createMovieService(moviesFile: string): MovieService {
        return new MovieService(moviesFile);
    }

    /**
     * Creates an instance of TweetService.
     * @returns An instance of TweetService.
     */
    static createTweetService(): TweetService {
        return new TweetService();
    }

    /**
     * Creates an instance of FileService.
     * @returns An instance of FileService.
     */
    static createFileService(): FileService {
        return new FileService();
    }
}
