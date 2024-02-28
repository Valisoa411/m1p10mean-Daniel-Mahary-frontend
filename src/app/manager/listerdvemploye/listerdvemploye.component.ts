import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { TokenService } from 'src/app/client/service/token.service';

@Component({
  selector: 'app-listerdvemploye',
  templateUrl: './listerdvemploye.component.html',
  styleUrls: ['./listerdvemploye.component.css']
})
export class ListerdvemployeComponent {
  listeRdv: any[] = [];
  date1:string ="";
  date2:string ="";
  employeeId:string="";
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
      this.getListeRdv();
    });
  }
  getListeRdv(): void {
    this.managerApi.getListeRdv(this.employeeId).subscribe(
      (rdv) => {
      this.listeRdv = rdv;
      console.log('Taille de this.listeRdv :', this.listeRdv.length);
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  }
  logout():void{
    this.managerApi.logout();
    this.router.navigate(['manager/login']);
  }
  searchRdvDate():void{
    this.managerApi.searchRdv(this.employeeId,this.date1,this.date2).subscribe(
      (rdv) => {
      this.listeRdv = rdv;
      console.log('Taille de this.listeRdv :', this.listeRdv.length);
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  }
}
