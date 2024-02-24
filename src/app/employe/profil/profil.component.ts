import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { TokenService } from 'src/app/client/service/token.service';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  employee: Employe = new Employe();
  nouvellePhotoFile: File = new File([], '');
  mdptemp="";
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private employeApi: EmployeApi
  ) { }

  onNouvellePhotoChange(event: any): void {
    this.nouvellePhotoFile = event.target.files[0];
  }

  ngOnInit(): void {
    // Récupérez l'ID de l'employé à partir du TokenService
    this.employeApi.getEmploye().subscribe(
      (employeeDetails) => {
        alert(employeeDetails.nom);
        // Initialisez l'objet employee avec les détails récupérés
        this.employee = employeeDetails;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'employé :', error);
      }
    );
  }

  updateEmploye(): void {
    this.employee.mdp=this.mdptemp;
    // ... autres informations à mettre à jour ...
    if (this.nouvellePhotoFile) {
      this.employeApi.updateEmployeWithPic(this.employee, this.nouvellePhotoFile).subscribe((data) => {
        console.log('Employé mis à jour avec succès :', data);
      });
    } else {
      this.employeApi.updateEmploye(this.employee).subscribe((data) => {
        console.log('Employé mis à jour avec succès :', data);
      });
    }
  
    this.router.navigate(['employe/accueilEmploye']);
  }
}
