import { Component } from '@angular/core';
import { EmployeApi } from 'src/app/api/employe.api';
import { HoraireApi } from 'src/app/api/horaire.api';
import { Horaire } from 'src/app/model/horaire.model';
import { jourSemaine } from 'src/app/util/data';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})
export class HoraireComponent {
  idEmploye: string = '65d0b02fdb98230f00ba0925';
  horaires: Horaire[] = [];
  selectedHoraire: Horaire | undefined;
  delete: boolean = false;
  message: string = '';
  succes: boolean = false;
  jourSemaine: string[] = jourSemaine;

  constructor(private horaireApi: HoraireApi, private employeApi: EmployeApi) {
    this.loadHoraires();
  }

  test() {
    // console.log("test: ", this.horaires);
    this.horaires.forEach(horaire => {
      console.log("test horaire: ", horaire);
      console.log("test jour: ", this.jourSemaine[horaire.jour ? horaire.jour : 0]);

    })
  }

  clearScreen() {
    this.selectedHoraire = undefined;
    this.delete = false;
  }

  loadHoraires(): void {
    this.employeApi.getEmployeHoraires(this.idEmploye).subscribe((data) => {
      this.horaires = data.horaires;
    })
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
