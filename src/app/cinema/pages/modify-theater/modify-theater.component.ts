import { Component, OnInit } from '@angular/core';
import { Theater } from '../../interfaces/theater.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { CinemaService } from '../../services/cinema.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-modify-theater',
  templateUrl: './modify-theater.component.html',
  styleUrls: ['./modify-theater.component.scss']
})
export class ModifyTheaterComponent implements OnInit {
  theaterId: number | null = null;
  rows: number = 1;
  columns: number = 1;
  maxSize: number = 26;
  allTheaters: Theater[] = [];
  existingTheater: Theater | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private cinemaService: CinemaService, private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.allTheaters = this.sessionService.getItem('theaters') as Theater[] || [];

    if (!this.router.url.includes('edit')) {
        return;
    }
  

    this.activatedRoute.params.pipe(
        map(({ id }) => {
            const numericId = Number(id);
            const foundTheater = this.allTheaters.find(theater => String(theater.id) === String(numericId)) || {} as Theater;
            return foundTheater;
        })
    ).subscribe(theater => {
        this.existingTheater = theater;
        this.rows = theater.rows;
        this.columns = theater.columns;
    });
}

  saveTheater(): void {
    if (this.existingTheater) {
      if (this.rows < this.existingTheater.rows || this.columns < this.existingTheater.columns) {
        alert('No puedes reducir el número de filas o columnas.');
        return;
      }
    }

    const body = {
      name: 'Sala ' + (this.existingTheater?.id || this.allTheaters.length + 1),
      columns: this.columns,
      rows: this.rows
    }

    console.log(body);

    if (this.existingTheater) {
      this.cinemaService.updateInfo('theater', String(this.existingTheater?.id), body)
        .subscribe();
    } else {
      this.cinemaService.postInfo('theater', body)
      .subscribe();
    }
    this.router.navigate(['/cinema/theaters']);
  }
}