import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isAdminMode: boolean = false;

  constructor(private router: Router, private modeService: ModeService) {
    this.modeService.isAdminMode$.subscribe(mode => this.isAdminMode = mode);
  }

  toggleMode() {
    this.modeService.toggleMode();
    this.router.navigate(['/cinema/movies']);
  }

}
