import { Movie } from '../models/movie.model';

export interface IMovieService {
    findMovieById(movieId: string): Movie | undefined;
}