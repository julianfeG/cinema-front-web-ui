import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { SessionService } from '../../services/session.service';
import { lastValueFrom } from 'rxjs';
import { MoviesShowtime } from '../../interfaces/moviesShowtime.interface';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies : MoviesShowtime[] = [];
  uuid: string = '';
  isAdminMode: boolean = false;

  constructor( private cinemaService: CinemaService,
               private sessionService: SessionService,
               private modeService: ModeService
  ) {
    this.modeService.isAdminMode$.subscribe(mode => this.isAdminMode = mode);
    this.uuid = this.sessionService.getItem('uuid') || '';
    if (this.uuid === '') {
      this.uuid = crypto.randomUUID();
      this.sessionService.setItem('uuid', this.uuid);
    }
  }

  ngOnInit() {
    Promise.all([
      lastValueFrom(this.cinemaService.getMoviesShowtime())
    ])
    .then(([movies]) => {
      console.log("Movies loaded:", movies);
      this.movies = movies as MoviesShowtime[];
      this.sessionService.setItem('movies', this.movies);
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
  }

}
