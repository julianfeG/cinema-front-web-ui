import { ReservedSeats } from "./reservedSeats.interface";

export interface ReservationReport {
    movie_title : string;
    theater_id :  string;
    datetime :    string;
    email  :      string;
    uuid  :       string;
    reservedseats: ReservedSeats[];
}
