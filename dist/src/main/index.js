"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweetController_1 = require("../main/controllers/tweetController"); // Ensure you have the correct path to TweetController
const logger_1 = __importDefault(require("./config/logger"));
const fs = __importStar(require("fs"));
const [reviewsFile, moviesFile] = process.argv.slice(2);
// Check if both files are provided
if (!reviewsFile || !moviesFile) {
    logger_1.default.error('Please provide both reviews.json and movies.json as arguments.');
    process.exit(1);
}
// Check if the review file exists
if (!fs.existsSync(reviewsFile)) {
    logger_1.default.error(`Reviews file not found: ${reviewsFile}`);
    process.exit(1);
}
// Check if the movie file exists
if (!fs.existsSync(moviesFile)) {
    logger_1.default.error(`Movies file not found: ${moviesFile}`);
    process.exit(1);
}
const tweetController = new tweetController_1.TweetController(reviewsFile, moviesFile);
tweetController.generateTweets();
//# sourceMappingURL=index.js.map