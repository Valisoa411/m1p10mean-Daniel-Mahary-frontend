import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { Depense } from 'src/app/model/depense.model';

@Component({
  selector: 'app-listedepense',
  templateUrl: './listedepense.component.html',
  styleUrls: ['./listedepense.component.css']
})
export class ListedepenseComponent {
  listeDepense: Depense[] = [];
  constructor(private managerAPi: ManagerApi,private router:Router,private renderer: Renderer2){
    this.loadDepense();
  }
  loadDepense(): void {
    this.managerAPi.getAllDepenses().subscribe(
      {next: (data) => {
        // console.log(data);
        this.listeDepense = data;
      },
      error: (error) => {
        alert(error.error.message);
      }})
  }
  deleteDepense(iddepense:string | undefined):void{
    this.managerAPi.deleteDepense(iddepense).subscribe(
      {next: (data) => {
          this.loadDepense();
          // console.log(data);
      },
      error: (error) => {
        alert(error.error.message);
      }});
  }
  getNomMois(numeroMois: any): string {
    const nomsMois = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    if (numeroMois >= 1 && numeroMois <= 12) {
      return nomsMois[numeroMois - 1];
    } else {
      return 'Mois invalide';
    }
  }
  logout():void{
    this.managerAPi.logout();
    this.router.navigate(['manager/login']);
  }
}
