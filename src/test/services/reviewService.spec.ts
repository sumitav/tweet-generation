import { ReviewService } from '../../main/services/review.service';
import { FileReader } from '../../main/utils/fileReader';
import { ReviewDTO } from '../../main/models/review.model';
import logger from '../../main/config/logger';

jest.mock('../../main/utils/fileReader.ts');

describe('ReviewService', () => {
    const mockReviewsFilePath = '../../../reviews.json';
    const mockReviews: ReviewDTO[] = [
        { title: 'Inception', review: 'A mind-bending thriller!', score: 90 },
        { title: 'The Matrix', review: 'A groundbreaking sci-fi film.', score: 95 },
        { title: 'Interstellar', review: 'A visually stunning journey through space.', score: 85 },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should read reviews from file and initialize reviews array', () => {
        (FileReader.readJSON as jest.Mock).mockReturnValue(mockReviews);

        const reviewService = new ReviewService(mockReviewsFilePath);

        expect(FileReader.readJSON).toHaveBeenCalledWith(mockReviewsFilePath);
        expect(reviewService.getAllReviews()).toEqual(mockReviews);
    });

    test('should handle error when reading reviews file', () => {
        (FileReader.readJSON as jest.Mock).mockImplementation(() => {
            throw new Error('File read error');
        });

        const reviewService = new ReviewService(mockReviewsFilePath);
        expect(reviewService.getAllReviews()).toEqual([]);
    });
    test('should log a warning when the reviews array is empty', () => {
        (FileReader.readJSON as jest.Mock).mockReturnValue([]);
        const reviewsFile = '../../../reviews.json';

        const loggerSpy = jest.spyOn(logger, 'warn').mockImplementation();
        new ReviewService(reviewsFile);
        expect(loggerSpy).toHaveBeenCalledTimes(1);
        expect(loggerSpy).toHaveBeenCalledWith(`The review is empty: ${reviewsFile}`);
    });
});
