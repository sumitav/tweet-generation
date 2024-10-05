import { ReviewDTO } from '../models/review.model';

export interface IReviewService {
    getAllReviews(): ReviewDTO[];
}
