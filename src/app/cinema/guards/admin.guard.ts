import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ModeService } from '../services/mode.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdminMode: boolean = false;

  constructor(private modeService: ModeService, private router: Router) {
    this.modeService.isAdminMode$.subscribe(mode => this.isAdminMode = mode);
  }
  
  canActivate(): boolean {
    if (!this.isAdminMode) {
      this.router.navigate(['/cinema/movies']);
      return false;
    }
    return true;
  }
  
}
