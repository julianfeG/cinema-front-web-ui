import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TheaterComponent } from './pages/theater/theater.component';
import { SeatsComponent } from './pages/seats/seats.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ModifyTheaterComponent } from './pages/modify-theater/modify-theater.component';
import { AdminGuard } from './guards/admin.guard';
import { SeatsGuard } from './guards/seats.guard';

const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'theaters',
        component: TheaterComponent
      },
      {
        path: 'seats',
        component: SeatsComponent,
        canActivate: [SeatsGuard]
      },
      {
        path: 'reservations',
        component: ReservationsComponent
      },
      {
        path: 'edit/:id',
        component: AdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'theater-edit/:id',
        component: ModifyTheaterComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'theater-add',
        component: ModifyTheaterComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'add',
        component: AdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path: '**',
        redirectTo: 'movies'
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class CinemaRoutingModule { }
