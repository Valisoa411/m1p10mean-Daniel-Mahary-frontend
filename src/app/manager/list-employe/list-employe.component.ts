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

  constructor(private managerApi: ManagerApi,private route: Router) {
    this.getListeEmploye();
  }

  ngOnInit(): void {
    
  }

  getListeEmploye(): void {
    this.managerApi.getListeEmploye().subscribe(
      (employes) => {
        this.listeEmploye = employes;
      },
      (error) => {
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
        console.error('Erreur lors de la suppression de l\'employé :', error);
      }
    );
  }
  searchEmploye(): void {
    this.managerApi.searchEmployes(this.termeRecherche).subscribe(
      (result) => {
        this.listeEmploye = result;
      },
      (error) => {
        console.error('Erreur lors de la recherche d\'employés :', error);
      }
    );
  }
}