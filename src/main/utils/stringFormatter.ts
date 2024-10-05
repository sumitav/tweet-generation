import { InputValidationException } from "../exceptions/InputValidationException";
import { RatingException } from "../exceptions/RatingException";

export class StringFormatter {
    /**
     * Convert rating (0-100) into Unicode stars.
     * 
     * @param score - A numeric score between 0 and 100 representing the rating.
     * @returns A string representation of the rating using Unicode stars.
     * @throws Error if the score is not between 0 and 100.
     */
     public static formatRating(score: number): string {
        if (isNaN(score)) {
            throw new RatingException('Score must be a valid number');
        }
    
        if (score < 0 || score > 100) {
            throw new RatingException('Score must be between 0 and 100');
        }
        score /= 20;
        const rate = Math.round(score);
        let rating = '★'.repeat(rate);

        const accumulated = score - Math.floor(score);

        if (accumulated > 0 && accumulated <= 0.5) {
            rating = '★'.repeat(Math.floor(score));
            rating += '½';
        }

        return rating;
    }
      /**
     * Construct a tweet from the movie title, year, review text, and star rating,
     * ensuring it does not exceed 140 characters.
     * 
     * @param movieTitle - The title of the movie.
     * @param year - The release year of the movie.
     * @param review - The review text for the movie.
     * @param stars - The star rating as a string.
     * @returns A formatted tweet string that fits within the character limit.
     * @throws Error if movieTitle or review is not a string, or year is not a number.
     */
    public static trimToFit(movieTitle: string, year: number, review: string, stars: string): string {
        if (typeof movieTitle !== 'string' || typeof review !== 'string') {
            throw new InputValidationException('Invalid input: movieTitle and review must be strings');
        }
        if (year && typeof year !== 'number') {
            throw new InputValidationException('Invalid input: year must be a number');
        }
        let tweet = `${movieTitle}${year==null ? '' : ` (${year})`}: ${review} ${stars}`;

        // If tweet exceeds 140 characters, start trimming
        if (tweet.length > 140) {
            // Step 1: Trim the movie title to a maximum of 25 characters
            movieTitle = movieTitle.slice(0, 25);
            tweet = `${movieTitle}${year ? ` (${year})` : ''}: ${review} ${stars}`;
            
            // Step 2: If the tweet is still too long, calculate the remaining characters for the review
            const baseTweetLength = `${movieTitle}${year ? ` (${year})` : ''}: `.length + stars.length;
            //ideal length for review
            const remainingCharsForReview = 140 - baseTweetLength;
            
            // Trim the review to fit within the remaining characters
            review = review.slice(0, remainingCharsForReview-1);
            return `${movieTitle}${year ? ` (${year})` : ''}: ${review} ${stars}`;
        }
    
        return tweet;
    }
}
