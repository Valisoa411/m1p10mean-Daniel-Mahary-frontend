import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { addDuree } from 'src/app/util/util';
import { TokenService } from '../service/token.service';
import { RendezVous } from 'src/app/model/rendezVous.model';
import { ClientApi } from 'src/app/api/client.api';

@Component({
  selector: 'app-listerdv',
  templateUrl: './listerdv.component.html',
  styleUrls: ['./listerdv.component.css']
})
export class ListerdvComponent {
  rdvR=new RendezVous();
  listeRdv: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private clientApi: ClientApi,
    private renderer: Renderer2
  ){
    this.getListeRdv();
  }
  getListeRdv(): void {
    this.clientApi.getListeRdv(this.currentPage,this.itemsPerPage).subscribe(
      (rdv:any) => {
        this.listeRdv = rdv.listeRdv;
        this.totalItems = rdv.totalItems;
        this.calculateTotalPages();
      console.log('Taille de this.listeRdv :', this.listeRdv.length);
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.getListeRdv();
      
    }
  }
  logout():void{
    this.clientApi.logout();
    this.router.navigate(['employe/signin']);
  }
  updateRdv(id:string):void{
    this.clientApi.getRdv(id).subscribe(
      (rdv) => {
        this.rdvR=rdv;
        // console.log(rdv);
        const currentDate = new Date("2024-03-10T13:30:00Z");
        console.log(currentDate);
        const startDate = new Date(rdv.date);
        console.log(startDate); // Supposons que rdv.date contient la date de début du rendez-vous
        const endDate = addDuree(new Date(rdv.date), rdv.service.duree);
        console.log(endDate); // Ajoutez la durée du service en minutes à la date de début
    
        if (currentDate >= startDate) {
          alert("vous avez ratez votre rendez-vous,non remboursable");
          // Affichez une erreur ou effectuez une action appropriée
          console.error("Impossible de modifier le rendez-vous actuellement en cours.");
        } else {
          this.rdvR.etat="Annulé";
          this.clientApi.updateRdv(this.rdvR).subscribe(
            (data)=>{
              this.getListeRdv();
            },
            (error)=>{
              alert(error.error.message);
            }
          );
        }
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  }
}
