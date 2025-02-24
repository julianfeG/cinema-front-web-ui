import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from '../../services/cinema.service';
import { ReservedSeats } from '../../interfaces/reservedSeats.interface';
import { SessionService } from '../../services/session.service';
import { Theater } from '../../interfaces/theater.interface';
import { MoviesShowtime } from '../../interfaces/moviesShowtime.interface';
import { Showtime } from '../../interfaces/showtime.interface';
import { Reservation } from '../../interfaces/reservation.interface';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogReserveComponent } from '../../components/dialog-reserve/dialog-reserve.component';


@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatsComponent implements OnInit {

  uuid: string = '';
  showtime: string = '';
  seats = {} as ReservedSeats[];
  movies: MoviesShowtime[] = [];
  theaters: Theater[] = [];
  selectedTheater: Theater | undefined;
  selectedShowtime: Showtime | undefined;
  selectedMovie: MoviesShowtime | undefined;
  selectedSeats: string[] = [];
  email = '';
  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.showtime = params['showtime'] || '';

      if (this.showtime) {
        this.buildVariables();
      }
    });
  }

  buildVariables() {
    this.uuid = this.sessionService.getItem('uuid') || '';

    this.movies = this.sessionService.getItem('movies') as MoviesShowtime[] || [];

    this.theaters = this.sessionService.getItem('theaters') as Theater[] || [];
    if (this.theaters.length === 0) {
      this.cinemaService.getInfo('theater').subscribe(theaters => {
        this.theaters = theaters as Theater[];
        this.sessionService.setItem('theaters', this.theaters);
        this.selectData();
      });
    } else {
      this.selectData();
    }

    this.cinemaService.getReservedSeats(this.showtime)
      .subscribe(seats => {
        this.seats = seats as ReservedSeats[];
        console.log('Seats:', this.seats);
      });
  }

  selectData() {
    this.selectedMovie = this.movies.find(movie =>
      movie.showtimes.some(show => String(show.id) === this.showtime)
    );
    this.selectedShowtime = this.selectedMovie?.showtimes.find(show => String(show.id) === this.showtime);
    this.selectedTheater = this.theaters.find(theater => theater.id === this.selectedShowtime?.theater_id);
  }

  isSeatOccupied(row: number, column: number): boolean {
    return this.seats.some(seat => seat.seat_row === row && seat.seat_column === column);
  }

  toggleSeatSelection(row: number, column: number) {
    const seatKey = `${row}-${column}`;
  
    if (this.isSeatOccupied(row, column)) return;
  
    if (this.selectedSeats.includes(seatKey)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== seatKey);
    } else {
      this.selectedSeats.push(seatKey);
    }

    console.log('Selected Seats:', this.selectedSeats);
  }
  
  isSeatSelected(row: number, column: number): boolean {
    return this.selectedSeats.includes(`${row}-${column}`);
  }

  reserveSeats() {
    const seatsSelected = this.selectedSeats.map(seat => {
      const [seatRow, seatColumn] = seat.split('-');
      return { seatRow, seatColumn };
    });
    const bodyReservation: Reservation = {
      uuid: this.uuid,
      showtimeId: this.showtime,
      reservedSeats: seatsSelected,
      email: this.email
    };
    this.cinemaService.saveReservation(bodyReservation).subscribe(res => {
      this.openModal();
    });

  }

  openModal(): void {
    this.dialog.open(DialogReserveComponent);
  }

  
}
