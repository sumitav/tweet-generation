import { StringFormatter } from '../../main/utils/stringFormatter';
import { InputValidationException } from '../../main/exceptions/InputValidationException';
import { RatingException } from '../../main/exceptions/RatingException';

describe('StringFormatter', () => {
    describe('formatRating', () => {
        test('should convert a valid rating to stars', () => {
            expect(StringFormatter.formatRating(100)).toBe('★★★★★');
            expect(StringFormatter.formatRating(80)).toBe('★★★★');
            expect(StringFormatter.formatRating(45)).toBe('★★½');
        });

        test('should throw RatingException for invalid ratings', () => {
            expect(() => StringFormatter.formatRating(-1)).toThrow(RatingException);
            expect(() => StringFormatter.formatRating(101)).toThrow(RatingException);
            expect(() => StringFormatter.formatRating('invalid' as any)).toThrow(RatingException);
        });
    });

    describe('trimToFit', () => {
        test('should create a valid tweet without trimming', () => {
            const tweet = StringFormatter.trimToFit('Inception', 2010, 'A mind-bending thriller!', '★★★★');
            expect(tweet).toBe('Inception (2010): A mind-bending thriller! ★★★★');
        });

        test('should trim the movie title to 25 characters if needed', () => {
            const longTitle = 'A Very Long Movie Title That Exceeds The Character Limit';
            const review = 'An excellent movie with superb acting and a fantastic storyline that keeps you hooked!';
            const stars = '★★★★';
            const year = 2023;
            const tweet = StringFormatter.trimToFit(longTitle, year, review, stars);
            expect(tweet).toBe('A Very Long Movie Title T (2023): An excellent movie with superb acting and a fantastic storyline that keeps you hooked! ★★★★');
});

        test('should trim the review to fit within 140 characters', () => {
            const movieTitle = 'A Movie Title';
            const year = 2023;
            const review = 'This is a very long review that is definitely going to exceed the character limit imposed by the tweet.' +
                           ' Therefore, it should be trimmed appropriately to fit within the allowed character count.';
            const stars = '★★★★';
            const tweet = StringFormatter.trimToFit(movieTitle, year, review, stars);
            expect(tweet.length).toBeLessThanOrEqual(140);
            expect(tweet).toContain(movieTitle);
        });

        test('should throw InputValidationException for invalid inputs', () => {
            expect(() => StringFormatter.trimToFit(123 as any, 2023, 'Valid review', '★★★★')).toThrow(InputValidationException);
            expect(() => StringFormatter.trimToFit('Valid title', 'Invalid year' as any, 'Valid review', '★★★★')).toThrow(InputValidationException);
            expect(() => StringFormatter.trimToFit('Valid title', 2023, 123 as any, '★★★★')).toThrow(InputValidationException);
        });
    });
});
