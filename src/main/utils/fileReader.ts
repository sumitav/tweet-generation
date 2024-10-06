import * as fs from 'fs';
import logger from '../config/logger';
import { FileReadException } from '../exceptions/FileReadException';

export class FileReader {
    /**
     * Reads a JSON file and parses it into an object.
     * @param filePath - The path to the JSON file.
     * @returns The parsed JSON object of type T.
     * @throws An error if the file cannot be read or if the JSON is invalid.
     */
    static readJSON<T>(filePath: string): T {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
    
            if (fileData.trim() === '') {
                logger.warn(`The JSON file is empty: ${filePath}`);
                return [] as unknown as T;
            }
    
            return JSON.parse(fileData);
        } catch (error) {
            if (error instanceof SyntaxError) {
                logger.error(`Invalid JSON format in file: ${filePath}`);
            } else {
                logger.error(`Error reading JSON file at ${filePath}: ${error.message}`);
            }
            throw new FileReadException(`Could not read or parse JSON file: ${filePath}`);
        }
    }
}
