import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class SeatsGuard implements CanActivate {
  uuid: string = '';
  movies = [];

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}
  
  canActivate(): boolean {
    this.uuid = this.sessionService.getItem('uuid') || '';
    this.movies = this.sessionService.getItem('movies') || [];
    if (this.uuid === '' || this.movies.length === 0) {
      this.router.navigate(['/cinema/movies']);
      return false;
    }
    return true;
  }
  
}
