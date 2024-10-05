import { ReviewDTO } from '../models/review.model';
import { FileReader } from '../utils/fileReader';
import logger from '../config/logger';
import { IReviewService } from '../interfaces/review.service.interface';

export class ReviewService implements IReviewService {
    private reviews: ReviewDTO[];

    constructor(reviewsFile: string) {
        try {
            this.reviews = FileReader.readJSON<ReviewDTO[]>(reviewsFile);
        } catch (error) {
            logger.error(`Error reading reviews file: ${error.message}`);
            this.reviews = [];
        }
    }

    /**
     * Retrieves all reviews.
     * @returns An array of review objects.
     */
    getAllReviews(): ReviewDTO[] {
        return this.reviews;
    }
}
