import { Component } from '@angular/core';
import { HoraireApi } from 'src/app/api/horaire.api';
import { Horaire } from 'src/app/model/horaire.model';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})
export class HoraireComponent {
  horaires: Horaire[] = [];
  selectedHoraire: Horaire | undefined;
  delete: boolean = false;
  message: string = '';
  succes: boolean = false;

  constructor(private horaireApi: HoraireApi) {
    this.loadHoraires();
  }

  clearScreen() {
    this.selectedHoraire = undefined;
    this.delete = false;
  }

  loadHoraires(): void {

  }

  openDeleteConfirmation(horaire: Horaire) {
    this.selectedHoraire = horaire;
    this.delete = true;
  }

  deleteService(): void {
    if (this.selectedHoraire && this.selectedHoraire._id) {

    }
  }
}
