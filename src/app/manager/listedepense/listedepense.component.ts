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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  constructor(private managerAPi: ManagerApi,private router:Router,private renderer: Renderer2){
    this.loadDepense();
  }
  loadDepense(): void {
    this.managerAPi.getAllDepenses(this.currentPage, this.itemsPerPage).subscribe(
      {next: (data:any) => {
        // console.log(data);
        this.listeDepense = data.listeDepense;
        this.totalItems = data.totalItems;
        this.calculateTotalPages();
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
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadDepense();
    }
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
