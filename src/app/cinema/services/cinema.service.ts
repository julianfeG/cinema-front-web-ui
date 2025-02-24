import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theater } from '../interfaces/theater.interface';
import { ReservedSeats } from '../interfaces/reservedSeats.interface';
import { Showtime } from '../interfaces/showtime.interface';
import { MoviesShowtime } from '../interfaces/moviesShowtime.interface';
import { Reservation } from '../interfaces/reservation.interface';
import { ReservationReport } from '../interfaces/reservationReport.interface';


@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) {
  }

  getInfo(searchParam: string): Observable<Movie[] | Theater[] | Showtime[]> {
    return this.http.get<Movie[] | Theater[] | Showtime[]>(`${this.baseUrl}/cinema/${searchParam}`);
  }

  postInfo(searchParam: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/cinema/${searchParam}`, body, { headers });
  }

  deleteInfo(searchParam: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/cinema/${searchParam}/${id}`);
  }

  updateInfo(searchParam: string, id: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${this.baseUrl}/cinema/${searchParam}/${id}`, body, { headers });
  }

  getReservedSeats(showtimeId: string): Observable<ReservedSeats[]> {
    return this.http.get<ReservedSeats[]>(`${this.baseUrl}/cinema/reservedSeats/${showtimeId}`);
  }

  getMoviesShowtime(): Observable<MoviesShowtime[]> {
    return this.http.get<MoviesShowtime[]>(`${this.baseUrl}/cinema/moviesShowtime`);
  }

  getReservations(): Observable<ReservationReport[]> {
    return this.http.get<ReservationReport[]>(`${this.baseUrl}/cinema/reservations`);
  }

  saveReservation(body: Reservation): Observable<{reservationId: string}> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.post<{reservationId: string}>(`${this.baseUrl}/cinema/reservation`, body, { headers });
  }
}
