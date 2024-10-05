import { TweetService } from '../../main/services/tweet.service';
import { ReviewDTO } from '../../main/models/review.model';
import { StringFormatter } from '../../main/utils/stringFormatter';
import logger from '../../main/config/logger';

jest.mock('../../main/utils/stringFormatter'); 
jest.mock('../../main/config/logger.ts');

describe('TweetService', () => {
    let tweetService: TweetService;

    beforeEach(() => {
        tweetService = new TweetService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should generate a valid tweet from a review', () => {
        const mockReview: ReviewDTO = {
            title: 'Inception',
            review: 'A mind-bending thriller!',
            score: 90
        };
        const year = 2010;
        const mockStars = '★★★★';
        (StringFormatter.formatRating as jest.Mock).mockReturnValue(mockStars);
        (StringFormatter.trimToFit as jest.Mock).mockReturnValue('Inception (2010): A mind-bending thriller! ★★★★');

        const result = tweetService.generateTweet(mockReview, year);

        expect(StringFormatter.formatRating).toHaveBeenCalledWith(mockReview.score);
        expect(StringFormatter.trimToFit).toHaveBeenCalledWith(mockReview.title, year, mockReview.review, mockStars);
        expect(result).toBe('Inception (2010): A mind-bending thriller! ★★★★');
    });

    test('should return "Invalid review" for an invalid review object', () => {
        const invalidReview = { title: 'Inception', score: 90 };

        const result = tweetService.generateTweet(invalidReview as any, 2010);

        expect(logger.error).toHaveBeenCalledWith('Invalid review object provided to generateTweet');
        expect(result).toBe('Invalid review');
    });
});
