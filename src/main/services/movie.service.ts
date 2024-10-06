import { MovieDTO } from '../models/movie.model';
import { IMovieService } from '../interfaces/movie.service.interface';
import { FileReader } from '../utils/fileReader';
import logger from '../config/logger';
import { FileReadException } from '../exceptions/FileReadException';

export class MovieService implements IMovieService {
    private movies: MovieDTO[] = [];
    private movieMap: Map<string, MovieDTO> = new Map();

    constructor(moviesFile: string) {
        try {
            this.movies = FileReader.readJSON<MovieDTO[]>(moviesFile);

            if (!Array.isArray(this.movies)) {
                logger.error(`Movies file does not contain an array: ${moviesFile}`);
                throw new FileReadException('Invalid movie data format');
            }
            this.movieMap = new Map(this.movies.map(movie => [movie.title, movie]));
        } catch (error) {
            logger.error(`Error reading movies file: ${error.message}`);
            throw new FileReadException(`Failed to read movies from file: ${moviesFile}`);
        }
    }
    /**
     * method to find movie by ID
     * @param movieId 
     * @returns 
     */
    findMovieById(movieId: string): MovieDTO | undefined {
        return this.movieMap.get(movieId);
    }
    /**
     * method to check whether the movies is empty
     * @returns 
     */
    isEmpty(): boolean {
        return this.movies.length === 0;
    }
}
