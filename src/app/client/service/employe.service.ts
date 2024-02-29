// token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeService {
  private readonly Employe_KEY = 'photo_employe';

  setPhoto(photo: string): void {
    localStorage.setItem(this.Employe_KEY, photo);
  }

  getPhoto(): string | null {
    return localStorage.getItem(this.Employe_KEY);
  }

  removePhoto(): void {
    localStorage.removeItem(this.Employe_KEY);
  }
}