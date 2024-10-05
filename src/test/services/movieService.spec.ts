import { MovieService } from '../../main/services/movie.service';
import { FileReadException } from '../../main/exceptions/FileReadException';
import { MovieDTO } from '../../main/models/movie.model';
import { FileReader } from '../../main/utils/fileReader';
jest.mock('fs');
jest.mock('../../main/utils/fileReader');

describe('MovieService', () => {
    const mockMoviesFilePath = '../../../movies.json';
    const mockMovies: MovieDTO[] = [
        { title: 'Inception', year: 2010 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Interstellar', year: 2014 },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should read movies from file and initialize movieMap', () => {
        (FileReader.readJSON as jest.Mock).mockReturnValue(mockMovies);

        const movieService = new MovieService(mockMoviesFilePath);

        expect(FileReader.readJSON).toHaveBeenCalledWith(mockMoviesFilePath);
        expect(movieService['movies']).toEqual(mockMovies);
        expect(movieService['movieMap'].get('Inception')).toEqual(mockMovies[0]);
    });

    test('should throw FileReadException if reading movies file fails', () => {
        (FileReader.readJSON as jest.Mock).mockImplementation(() => {
            throw new Error('File read error');
        });

        expect(() => new MovieService(mockMoviesFilePath)).toThrow(FileReadException);
        expect(() => new MovieService(mockMoviesFilePath)).toThrow('Failed to read movies from file:');
    });

    test('should find a movie by title', () => {
        (FileReader.readJSON as jest.Mock).mockReturnValue(mockMovies);
        const movieService = new MovieService(mockMoviesFilePath);

        const foundMovie = movieService.findMovieById('Inception');
        expect(foundMovie).toEqual(mockMovies[0]);
    });

    test('should return undefined for a non-existing movie title', () => {
        (FileReader.readJSON as jest.Mock).mockReturnValue(mockMovies);
        const movieService = new MovieService(mockMoviesFilePath);

        const foundMovie = movieService.findMovieById('Non-Existent Movie');
        expect(foundMovie).toBeUndefined();
    });
});
