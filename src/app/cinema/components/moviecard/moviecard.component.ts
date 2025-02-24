import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MoviesShowtime } from '../../interfaces/moviesShowtime.interface';
import { ModeService } from '../../services/mode.service';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss']
})
export class MoviecardComponent {
  @Input() movie!: MoviesShowtime;
  isAdminMode: boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(private router: Router,
              private modeService: ModeService) {
      this.modeService.isAdminMode$.subscribe(mode => this.isAdminMode = mode);
    }

    updateMovie(mov: MoviesShowtime) {
      this.router.navigate(['/cinema/edit', mov.id]);
    }

    deleteMovie(mov: MoviesShowtime) {
      this.openModal();
    }

    openModal(): void {
      this.dialog.open(DialogConfirmComponent, {
        data: { message: "pelicula", id: this.movie.id }
      });
    }
}
