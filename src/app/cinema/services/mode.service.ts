import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private isAdminMode = new BehaviorSubject<boolean>(false);
  isAdminMode$ = this.isAdminMode.asObservable();

  toggleMode() {
    this.isAdminMode.next(!this.isAdminMode.value);
  }

  getCurrentMode(): boolean {
    return this.isAdminMode.value;
  }
}
