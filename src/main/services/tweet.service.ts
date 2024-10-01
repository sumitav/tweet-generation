import { Review } from '../models/review.model';
import { StringFormatter } from '../utils/stringFormatter';
import logger from '../config/logger'; // Ensure you have a logger set up

export class TweetService {
    /**
     * Generates a tweet from a review.
     * @param review - The review object containing title, review text, and score.
     * @param year - The year of the movie.
     * @returns A formatted tweet string.
     */
    generateTweet(review: Review, year: number): string {
        // Input validation
        if (!review || typeof review !== 'object' || !review.title || !review.review || review.score === undefined) {
            logger.error('Invalid review object provided to generateTweet');
            return 'Invalid review';
        }

        const stars = StringFormatter.formatRating(review.score);
        return StringFormatter.trimToFit(review.title, year, review.review, stars);
    }
}
