import { Movie } from '../models/movie.model';
import { IMovieService } from '../interfaces/movie.service.interface';
import { FileReader } from '../utils/fileReader';
import logger from '../config/logger';
import { FileReadException } from '../exceptions/FileReadException';

export class MovieService implements IMovieService {
    private movies: Movie[];
    private movieMap: Map<string, Movie>;

    constructor(moviesFile: string) {
        try {
            this.movies = FileReader.readJSON<Movie[]>(moviesFile);
            this.movieMap = new Map(this.movies.map(movie => [movie.title, movie]));
        } catch (error) {
            logger.error(`Error reading movies file: ${error.message}`);
            throw new FileReadException(`Failed to read movies from file: ${moviesFile}`);
        }
    }

    /**
     * Finds a movie by its title.
     * @param movieId The title of the movie to find.
     * @returns The movie object if found, otherwise undefined.
     */
    findMovieById(movieId: string): Movie | undefined {
        return this.movieMap.get(movieId);
    }
}
