import { TweetApp } from './app.handler';

const files = process.argv.slice(2);
//init app
const tweetApp = new TweetApp(files);
tweetApp.validateFiles();
tweetApp.run();
