import { Review } from '../models/review.model';

export interface ITweetService {
    generateTweet(review: Review, year: number): string;
}
