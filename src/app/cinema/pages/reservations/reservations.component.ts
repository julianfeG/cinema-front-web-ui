import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CinemaService } from '../../services/cinema.service';
import { Reserva } from '../../interfaces/reserva.interface';
import { ReservationReport } from '../../interfaces/reservationReport.interface';
import { ModeService } from '../../services/mode.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  isAdminMode: boolean = false;
  reservations: ReservationReport[] = [];
  filteredReservations: ReservationReport[] = [];
  uniqueMovies: string[] = [];
  selectedMovie: string = "Todas";
  uuid: string = '';

  constructor(private cinemaService: CinemaService,
              private modeService: ModeService,
              private sessionService: SessionService) {
    this.modeService.isAdminMode$.subscribe(mode => this.isAdminMode = mode);
  }

  displayedColumns: string[] = ['pelicula', 'sala', 'fecha', 'hora', 'email', 'asientos'];
  dataSource = new MatTableDataSource<Reserva>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.uuid = this.sessionService.getItem('uuid') || '';
    this.cinemaService.getReservations().subscribe(res => {
      console.log('Reservations:', res);
      this.reservations = res as ReservationReport[];
      this.filteredReservations = [...this.reservations];
      this.uniqueMovies = [...new Set(this.reservations.map(reserva => reserva.movie_title))];

      this.loadReservations();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  rowToLetter(row: number): string {
    return String.fromCharCode(64 + row);
  }

  loadReservations() {
    this.dataSource.data = this.filteredReservations
      .filter(reserva => this.isAdminMode || reserva.uuid === this.uuid)
      .map(reserva => {
        const originalDate = new Date(reserva.datetime);
        const colombiaDate = new Date(originalDate.getTime() - (5 * 60 * 60 * 1000));
  
        return {
          pelicula: reserva.movie_title,
          sala: reserva.theater_id,
          fecha: colombiaDate.toISOString().split("T")[0],
          hora: colombiaDate.toISOString().split("T")[1].substring(0, 5),
          email: reserva.email,
          asientos: reserva.reservedseats.map(seat => `${this.rowToLetter(seat.seat_row)}${seat.seat_column}`)
        };
      });
  }
  

  filterByMovie() {
    if (this.selectedMovie === "Todas") {
      this.filteredReservations = [...this.reservations];
    } else {
      this.filteredReservations = this.reservations.filter(reserva => reserva.movie_title === this.selectedMovie);
    }
    this.loadReservations();
  }
}
