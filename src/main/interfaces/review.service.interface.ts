import { Review } from '../models/review.model';

export interface IReviewService {
    getAllReviews(): Review[];
}
