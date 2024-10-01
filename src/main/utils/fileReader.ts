import * as fs from 'fs';
import logger from '../config/logger'; // Ensure you have a logger set up

export class FileReader {
    /**
     * Reads a JSON file and parses it into an object.
     * @param filePath - The path to the JSON file.
     * @returns The parsed JSON object of type T.
     * @throws An error if the file cannot be read or if the JSON is invalid.
     */
    static readJSON<T>(filePath: string): T {
        if (typeof filePath !== 'string' || filePath.trim() === '') {
            logger.error('Invalid file path provided to readJSON');
            throw new Error('Invalid file path');
        }

        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileData);
        } catch (error) {
            logger.error(`Error reading JSON file at ${filePath}: ${error.message}`);
            throw new Error(`Could not read or parse JSON file: ${filePath}`);
        }
    }
}
