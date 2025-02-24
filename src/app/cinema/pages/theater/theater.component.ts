import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { Theater } from '../../interfaces/theater.interface';
import { SessionService } from '../../services/session.service';
import { ModeService } from '../../services/mode.service';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent implements OnInit {
  theaters : Theater[] = [];
  isAdminMode: boolean = false;
  
    constructor( private cinemaService: CinemaService,
                 private sessionService: SessionService,
                 private modeService: ModeService
    ) {this.modeService.isAdminMode$.subscribe(mode => this.isAdminMode = mode)}
  
    ngOnInit(): void {
      this.cinemaService.getInfo('theater')
        .subscribe( theaters => {
          this.theaters = theaters as Theater[];
          this.sessionService.setItem('theaters', this.theaters);
      });
    }
}
