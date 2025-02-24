import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmComponent {

  table = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, id: string },
              private cinemaService: CinemaService) {}

  reloadPage() {
    this.table = this.data.message == 'pelicula' ? 'movie' : 'theater';
    this.deleteOption(this.table, this.data.id);
  }

  deleteOption(option: string, id: string | undefined) {
    this.cinemaService.deleteInfo(this.table, String(id))
    .subscribe(res => {   
      window.location.href = `/cinema/${this.table}s`;
      });
  }

}
