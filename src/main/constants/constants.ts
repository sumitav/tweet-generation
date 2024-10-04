import path from "path";

export class Constants {
    public static readonly OUTPUT_DIR: string = path.join(process.cwd(), 'output');
    public static readonly DEFAULT_TWEET_FILENAME: string = 'output_tweet.json';
    public static readonly ERROR_CREATING_DIR: string = 'Error creating output directory';
    public static readonly ERROR_SAVING_TWEETS: string = 'Error saving tweets to file';
    public static readonly FAILED_TO_GENERATE_TWEETS: string = 'Failed to generate tweets';
    public static readonly INVALID_REVIEW_OBJECT: string = 'Invalid review object provided';
    public static readonly MOVIE_NOT_FOUND: string = 'Movie not found for the given title';
    public static readonly FILE_SAVE_ERROR: string ='Error saving tweets to file';
}