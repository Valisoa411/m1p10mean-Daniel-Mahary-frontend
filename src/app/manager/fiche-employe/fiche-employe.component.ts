import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { TokenService } from 'src/app/client/service/token.service';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-fiche-employe',
  templateUrl: './fiche-employe.component.html',
  styleUrls: ['./fiche-employe.component.css']
})
export class FicheEmployeComponent {
  employeeId:string="";
  employee: Employe = new Employe();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private managerApi: ManagerApi,
    private renderer: Renderer2
  ){
    
  }
  
  ngOnInit() {
    // Récupérez le paramètre d'URL (ici, '_id') à partir de ActivatedRoute
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      // Faites ce que vous voulez avec l'ID de l'employé
      console.log('Employee ID:', this.employeeId);
      this.managerApi.getEmploye(this.employeeId).subscribe(
        (employeeDetails) => {
          // Initialisez l'objet employee avec les détails récupérés
          this.employee = employeeDetails;
        },
        (error) => {
          alert(error.error.message);
          console.error('Erreur lors de la récupération des détails de l\'employé :', error);
        }
      );
    });
  }
  logout():void{
    this.managerApi.logout();
    this.router.navigate(['manager/login']);
  }
}
