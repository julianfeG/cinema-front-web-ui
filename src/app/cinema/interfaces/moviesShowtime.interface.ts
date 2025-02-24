import { Movie } from "./movie.interface";
import { Showtime } from "./showtime.interface";

export interface MoviesShowtime extends Movie {
    showtimes: Showtime[];
  }