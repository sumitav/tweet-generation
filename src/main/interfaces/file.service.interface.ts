export interface IFileService {
    /**
     * Saves an array of tweets to a specified file.
     * @param tweets - An array of tweet strings to save.
     * @param fileName - The name of the output file.
     */
    saveTweets(tweets: string[]): void;
}
