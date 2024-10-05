import { ReviewDTO } from '../models/review.model';

export interface ITweetService {
    generateTweet(review: ReviewDTO, year: number): string;
}
