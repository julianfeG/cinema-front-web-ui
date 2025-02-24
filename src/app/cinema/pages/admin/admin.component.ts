import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { CinemaService } from '../../services/cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../../services/session.service';
import { MoviesShowtime } from '../../interfaces/moviesShowtime.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allMovies : MoviesShowtime[] = [];
  movie = {} as MoviesShowtime;

  constructor(private cinemaService: CinemaService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private sessionService: SessionService) {}

  ngOnInit(): void {

    if(!this.router.url.includes('edit')) {
      return;
    }

    this.allMovies = this.sessionService.getItem('movies') as MoviesShowtime[] || [];

    this.activatedRoute.params.pipe(
      map(({ id }) => {
        const numericId = Number(id);
        const foundMovie = this.allMovies.find(movie => movie.id === numericId) || {} as MoviesShowtime;
        return foundMovie;
      })
    ).subscribe(movie => {
      this.movie = movie;
    });
    
    
  }

  guardar(): void {
    const body = {
      title: this.movie.title,
      duration: this.movie.duration,
      classification: this.movie.classification,
      genre: this.movie.genre,
      alt_img: this.movie.alt_img
    }
    if (this.movie.id) {
      this.cinemaService.updateInfo('movie', String(this.movie.id), body)
        .subscribe(movie => this.router.navigate(['/cinema/movies']));
    } else {
      this.cinemaService.postInfo('movie', body)
      .subscribe(movie => {   
          this.router.navigate(['/cinema/movies']);
          this.mostrarSnackBar('Registro Creado');
        });
    }
  }

  mostrarSnackBar( mensaje: string): void {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });
  }

}
