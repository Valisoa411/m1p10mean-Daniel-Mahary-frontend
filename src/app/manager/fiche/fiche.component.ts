import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { TokenService } from 'src/app/client/service/token.service';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent {
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

  ngOnInit(): void {
    this.loadEmploye();
  }
  
  loadEmploye():void {
    // Récupérez le paramètre d'URL (ici, '_id') à partir de ActivatedRoute
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      // Faites ce que vous voulez avec l'ID de l'employé
      
    });
  }
  logout():void{
    this.managerApi.logout();
    this.router.navigate(['manager/login']);
  }
}
