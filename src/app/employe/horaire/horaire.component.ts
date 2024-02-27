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
  idEmploye: string = '65d9a3b9b1e2daf29113db8d';
  horaires: Horaire[] = [];
  selectedHoraire: Horaire | undefined;
  update: boolean = false;
  delete: boolean = false;
  message: string = '';
  success: boolean = false;
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
    this.update = false;
    this.delete = false;
  }

  fillUpdateForm(horaire: Horaire) {
    this.selectedHoraire = horaire;
    this.update = true;
    console.log("fillUpdateForm: ", this.selectedHoraire);

  }

  openDeleteConfirmation(horaire: Horaire) {
    this.selectedHoraire = horaire;
    this.delete = true;
  }

  loadHoraires(): void {
    this.employeApi.getEmployeHoraires().subscribe(
      {next: (data) => {
        this.horaires = data.horaires;
      },
      error: (error) => {
        this.success = false;
        this.message = error.error.message;
        alert(this.message);
      }})
  }

  deleteService(): void {
    if (this.selectedHoraire && this.selectedHoraire._id) {
      this.horaireApi.deleteHoraire(this.selectedHoraire?._id).subscribe({
        next: (data) => {
          this.success = true;
          this.message = data.message;
        },
        error: (error) => {
          this.success = false;
          this.message = error.error.message;
        },
        complete: () => {
          this.clearScreen();
        }
      })
    }
  }
}
