import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.css']
})
export class ListEmployeComponent {
  listeEmploye: any[] = [];
  erreurRecuperationEmploye: string = '';
  termeRecherche: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  is_search=false;

  constructor(private managerApi: ManagerApi,private route: Router) {
    this.getListeEmploye();
    this.is_search=false;
  }

  ngOnInit(): void {
    
  }

  getListeEmploye(): void {
    this.managerApi.getListeEmploye(this.currentPage, this.itemsPerPage).subscribe(
      (response: any) => {
        this.listeEmploye = response.listeEmploye;
        this.totalItems = response.totalItems;
        this.calculateTotalPages();
      },
      (error) => {
        alert(error.error.message); 
        console.error('Erreur lors de la récupération de la liste des clients :', error);
        // if (error.status === 401 && error.error && error.error.error === 'Token expired') {
        //   // Rediriger vers la page de login en cas d'expiration du token
        //   this.route.navigate(['/signin']);
        // }else{
        //   this.route.navigate(['/signin']);
        // }
      }
    );
  }
  deleteEmploye(employeeId: string): void {
    this.managerApi.deleteEmploye(employeeId).subscribe(
      () => {
        console.log('Employé supprimé avec succès.');
        this.getListeEmploye(); // Rafraîchissez la liste après la suppression
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la suppression de l\'employé :', error);
      }
    );
  }
  searchEmploye(): void {
    if(!this.is_search){
      this.is_search=true;
      this.currentPage=1;
    }
    this.managerApi.searchEmployes(this.termeRecherche,this.currentPage, this.itemsPerPage).subscribe(
      (result:any) => {
        this.listeEmploye = result.listeEmploye;
        this.totalItems = result.totalItems;
        this.calculateTotalPages();
      },
      (error) => {
        alert(error.error.message);
        this.listeEmploye=[];
        // alert(error);
      }
    );
  }
  logout():void{
    this.managerApi.logout();
    this.route.navigate(['manager/login'])
  }
  detailRdvEmploye(employeeId: string):void {
    // Utilisez le service Router pour naviguer vers la page souhaitée
    this.route.navigate(['manager/listerdvemploye', employeeId]);
  }
  fiche(idemploye:string):void{
    this.route.navigate(['manager/fiche']);
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      
      if(!this.is_search){
        this.getListeEmploye();
      }else{
        this.searchEmploye();
      }
    }
  }
}