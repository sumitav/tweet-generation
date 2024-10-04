import { Review } from '../models/review.model';
import { FileReader } from '../utils/fileReader';
import logger from '../config/logger'; // Ensure you have a logger set up
import { IReviewService } from '../interfaces/review.service.interface';

export class ReviewService implements IReviewService {
    private reviews: Review[];

    constructor(reviewsFile: string) {
        try {
            this.reviews = FileReader.readJSON<Review[]>(reviewsFile);
        } catch (error) {
            logger.error(`Error reading reviews file: ${error.message}`);
            this.reviews = [];
        }
    }

    /**
     * Retrieves all reviews.
     * @returns An array of review objects.
     */
    getAllReviews(): Review[] {
        return this.reviews;
    }
}
