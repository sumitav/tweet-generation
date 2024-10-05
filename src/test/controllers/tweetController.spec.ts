import { TweetController } from '../../main/controllers/tweetController';
import { IReviewService } from '../../main/interfaces/review.service.interface';
import { IMovieService } from '../../main/interfaces/movie.service.interface';
import { ITweetService } from '../../main/interfaces/tweet.service.interface';
import { IFileService } from '../../main/interfaces/file.service.interface';
import { FileSaveException } from '../../main/exceptions/FileSaveException';
import logger from '../../main/config/logger';
import { Constants } from '../../main/constants/constants';

jest.mock('../../main/config/logger');

describe('TweetController', () => {
    let tweetController: TweetController;
    let mockReviewService: IReviewService;
    let mockMovieService: IMovieService;
    let mockTweetService: ITweetService;
    let mockFileService: IFileService;

    beforeEach(() => {
        mockReviewService = {
            getAllReviews: jest.fn(),
        };

        mockMovieService = {
            findMovieById: jest.fn(),
        };

        mockTweetService = {
            generateTweet: jest.fn(),
        };

        mockFileService = {
            saveTweets: jest.fn(),
        };

        tweetController = new TweetController(
            mockReviewService,
            mockMovieService,
            mockTweetService,
            mockFileService
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should generate tweets and save them to a file', () => {
        const mockReviews = [
            { title: 'Inception', review: 'A mind-bending thriller!', score: 90 },
            { title: 'The Matrix', review: 'A groundbreaking sci-fi film.', score: 95 },
        ];
        (mockReviewService.getAllReviews as jest.Mock).mockReturnValue(mockReviews);
        (mockMovieService.findMovieById as jest.Mock).mockReturnValue({ year: 2010 });
        (mockTweetService.generateTweet as jest.Mock).mockReturnValue('Inception (2010): A mind-bending thriller! ★★★★');
        tweetController.generateTweets();
        expect(mockReviewService.getAllReviews).toHaveBeenCalled();
        expect(mockMovieService.findMovieById).toHaveBeenCalledWith(mockReviews[0].title);
        expect(mockTweetService.generateTweet).toHaveBeenCalledWith(mockReviews[0], 2010);
        expect(mockFileService.saveTweets).toHaveBeenCalled();
    });

    test('should handle errors during tweet generation and saving', () => {
        const mockReviews = [
            { title: 'Inception', review: 'A mind-bending thriller!', score: 90 },
        ];
        (mockReviewService.getAllReviews as jest.Mock).mockReturnValue(mockReviews);
        (mockMovieService.findMovieById as jest.Mock).mockReturnValue({ year: 2010 });
        (mockTweetService.generateTweet as jest.Mock).mockReturnValue('Inception (2010): A mind-bending thriller! ★★★★');
        (mockFileService.saveTweets as jest.Mock).mockImplementation(() => {
            throw new FileSaveException('Failed to save file');
        });
        tweetController.generateTweets();

        expect(logger.error).toHaveBeenCalledWith(`${Constants.FILE_SAVE_ERROR}: Failed to save file`);
    });
    test('should log error for non-FileSaveException errors', () => {
        const mockError = new Error('Unexpected error');
        jest.spyOn(tweetController as any, 'collectTweets' as any).mockImplementation(() => {
            throw mockError;
        });
        tweetController.generateTweets();
        expect(logger.error).toHaveBeenCalledWith(`${Constants.FAILED_TO_GENERATE_TWEETS}: ${mockError.message}`);
    });
    test('should handle null or undefined year in the movie data and pass null to the tweet service', () => {
        const mockReviews = [
            { title: 'Inception', review: 'A mind-bending thriller!', score: 90 },
        ];
        (mockReviewService.getAllReviews as jest.Mock).mockReturnValue(mockReviews);
        (mockMovieService.findMovieById as jest.Mock).mockReturnValue({ year: null });
        const expectedTweet = 'Inception: A mind-bending thriller! ★★★★';
        (mockTweetService.generateTweet as jest.Mock).mockReturnValue(expectedTweet);
        tweetController.generateTweets();
        expect(mockReviewService.getAllReviews).toHaveBeenCalled();
        expect(mockMovieService.findMovieById).toHaveBeenCalledWith(mockReviews[0].title);
        expect(mockTweetService.generateTweet).toHaveBeenCalledWith(mockReviews[0], null);
    });
});
