import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';

@Pipe({
  name: 'imagen',
  pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(movie: Movie): string {

    if(!movie.alt_img) {
      return 'assets/no-image.png'
    } else if (movie.alt_img) {
      return movie.alt_img;
    }

    return `assets/heroes/${movie.id}.jpg`;
  }

}
