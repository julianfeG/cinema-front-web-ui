import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { CinemaRoutingModule } from './cinema-routing.module';
import { MaterialModule } from '../material/material.module';

import { HomeComponent } from './pages/home/home.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { TheaterComponent } from './pages/theater/theater.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MoviecardComponent } from './components/moviecard/moviecard.component';
import { TheaterspaceComponent } from './components/theaterspace/theaterspace.component';
import { DialogReserveComponent } from './components/dialog-reserve/dialog-reserve.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { ModifyTheaterComponent } from './pages/modify-theater/modify-theater.component';


@NgModule({
  declarations: [
    HomeComponent,
    ImagenPipe,
    TheaterComponent,
    ReservationsComponent,
    SeatsComponent,
    MoviesComponent,
    MoviecardComponent,
    TheaterspaceComponent,
    DialogReserveComponent,
    AdminComponent,
    DialogConfirmComponent,
    ModifyTheaterComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    CinemaRoutingModule
  ]
})
export class CinemaModule { }
