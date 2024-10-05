import path from "path";

export class Constants {
    public static readonly OUTPUT_DIR: string = path.join(process.cwd(), 'output');
    public static readonly DEFAULT_TWEET_FILENAME: string = 'output_tweet.json';
    public static readonly FAILED_TO_GENERATE_TWEETS: string = 'Failed to generate tweets';
    public static readonly FILE_SAVE_ERROR: string ='Error saving tweets to file';
}