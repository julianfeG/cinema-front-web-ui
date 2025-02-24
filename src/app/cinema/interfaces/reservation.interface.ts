interface ReservedSeats {
    seatRow:    string;
    seatColumn: string;
}

export interface Reservation {
    uuid:          string;
    showtimeId:    string;
    email:         string;
    reservedSeats: ReservedSeats[];
}
