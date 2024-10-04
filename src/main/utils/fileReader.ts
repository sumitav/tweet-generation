import * as fs from 'fs';
import logger from '../config/logger'; // Ensure you have a logger set up
import { FileReadException } from '../exceptions/FileReadException';

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
            throw new FileReadException('Invalid file path');
        }
        if (!fs.existsSync(filePath)) {
            logger.error(`File not found: ${filePath}`);
            throw new FileReadException(`File not found: ${filePath}`);
        }

        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileData);
        } catch (error) {
            if (error.code === 'ENOENT') {
                logger.error(`File does not exist at path: ${filePath}`);
            } else if (error instanceof SyntaxError) {
                logger.error(`Invalid JSON format in file: ${filePath}`);
            } else {
                logger.error(`Error reading JSON file at ${filePath}: ${error.message}`);
            }
            throw new FileReadException(`Could not read or parse JSON file: ${filePath}`);
        }
    }
}
