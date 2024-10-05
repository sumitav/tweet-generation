import { MovieDTO } from '../models/movie.model';

export interface IMovieService {
    findMovieById(movieId: string): MovieDTO | undefined;
}