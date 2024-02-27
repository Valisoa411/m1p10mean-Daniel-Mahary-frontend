import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { TokenService } from 'src/app/client/service/token.service';

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent {
  listeRdv: any[] = [];
  date1:string ="";
  date2:string ="";
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private employeApi: EmployeApi,
    private renderer: Renderer2
  ){
    this.getListeRdv();
  }
  getListeRdv(): void {
    
    this.employeApi.getListeRdv().subscribe(
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
    this.employeApi.logout();
    this.router.navigate(['employe/signin']);
  }
  searchRdvDate():void{
    this.employeApi.searchRdv(this.date1,this.date2).subscribe(
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
