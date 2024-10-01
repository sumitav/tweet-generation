import { Movie } from '../models/movie.model';
import { FileReader } from '../utils/fileReader';
import logger from '../config/logger'; // Ensure you have a logger set up

export class MovieService {
    private movies: Movie[];
    private movieMap: Map<string, Movie>;

    constructor(moviesFile: string) {
        try {
            this.movies = FileReader.readJSON<Movie[]>(moviesFile);
            this.movieMap = new Map(this.movies.map(movie => [movie.title, movie]));
        } catch (error) {
            logger.error(`Error reading movies file: ${error.message}`);
            this.movies = [];
            this.movieMap = new Map(); // Ensure this is initialized
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
