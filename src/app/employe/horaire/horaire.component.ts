import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { HoraireApi } from 'src/app/api/horaire.api';
import { EmployeService } from 'src/app/client/service/employe.service';
import { Horaire } from 'src/app/model/horaire.model';
import { jourSemaine } from 'src/app/util/data';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.css']
})
export class HoraireComponent {
  horaires: Horaire[] = [];
  selectedHoraire: Horaire | undefined;
  update: boolean = false;
  delete: boolean = false;
  message: string = '';
  success: boolean = false;
  jourSemaine: string[] = jourSemaine;
  photo:string|null="";

  constructor(private horaireApi: HoraireApi,private router: Router, private employeApi: EmployeApi,private employeService: EmployeService) {
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

  directDelete(horaire: Horaire): void {
    this.selectedHoraire = horaire;
    this.deleteHoraire();
  }

  deleteHoraire(): void {
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
  ngOnInit(): void {
    // Récupérez l'ID de l'employé à partir du TokenService
    if(this.employeService.getPhoto()){
      this.photo=this.employeService.getPhoto();
    }
    
  }
  logout():void{
    this.employeApi.logout();
    this.router.navigate(['employe/signin']);
  }
}
