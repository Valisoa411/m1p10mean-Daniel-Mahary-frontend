import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { EmployeService } from 'src/app/client/service/employe.service';
import { TokenService } from 'src/app/client/service/token.service';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-accueil-employe',
  templateUrl: './accueil-employe.component.html',
  styleUrls: ['./accueil-employe.component.css']
})
export class AccueilEmployeComponent {
  employee: Employe = new Employe();
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private employeApi: EmployeApi,
    private renderer: Renderer2,
    private employeService: EmployeService
  ) { }
  ngOnInit(): void {
    // Récupérez l'ID de l'employé à partir du TokenService
    this.employeApi.getEmploye().subscribe(
      (employeeDetails) => {
        // Initialisez l'objet employee avec les détails récupérés
        this.employee = employeeDetails;
        if (this.employee.photo) {
          this.employeService.setPhoto(this.employee.photo);
        }
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération des détails de l\'employé :', error);
      }
    );
  }
  logout():void{
    this.employeApi.logout();
    this.router.navigate(['employe/signin']);
  }
}
