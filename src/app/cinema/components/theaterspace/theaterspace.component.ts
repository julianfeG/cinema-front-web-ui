import { Component, inject, Input } from '@angular/core';
import { Theater } from '../../interfaces/theater.interface';
import { ModeService } from '../../services/mode.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-theaterspace',
  templateUrl: './theaterspace.component.html',
  styleUrls: ['./theaterspace.component.scss']
})
export class TheaterspaceComponent {
  @Input() theater!: Theater;
  isAdminMode: boolean = false;
  readonly dialog = inject(MatDialog);

  constructor(private modeService: ModeService
  ) {
    this.modeService.isAdminMode$.subscribe(mode => this.isAdminMode = mode);
   }

   deleteTheater(id: string | undefined) {
    this.openModal();
   }

    openModal(): void {
      this.dialog.open(DialogConfirmComponent, {
        data: { message: "sala", id: this.theater.id }
      });
    }
}
