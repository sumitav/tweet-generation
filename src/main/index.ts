import { TweetApp } from './app.handler';

const files = process.argv.slice(2);
const tweetApp = new TweetApp(files);
tweetApp.validateFiles();
tweetApp.run();
