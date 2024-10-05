import { ServiceFactory } from '../../main/factories/ServiceFactory';
import { ReviewService } from '../../main/services/review.service';
import { MovieService } from '../../main/services/movie.service';
import { TweetService } from '../../main/services/tweet.service';
import { FileService } from '../../main/services/file.service';

describe('ServiceFactory', () => {
    test('should create an instance of ReviewService', () => {
        const reviewsFile = '../../../reviews.json';
        const reviewService = ServiceFactory.createReviewService(reviewsFile);

        expect(reviewService).toBeInstanceOf(ReviewService);
    });

    test('should create an instance of MovieService', () => {
        const moviesFile = 'movies.json';
        const movieService = ServiceFactory.createMovieService(moviesFile);

        expect(movieService).toBeInstanceOf(MovieService);
    });

    test('should create an instance of TweetService', () => {
        const tweetService = ServiceFactory.createTweetService();

        expect(tweetService).toBeInstanceOf(TweetService);
    });

    test('should create an instance of FileService', () => {
        const fileService = ServiceFactory.createFileService();

        expect(fileService).toBeInstanceOf(FileService);
    });
});
