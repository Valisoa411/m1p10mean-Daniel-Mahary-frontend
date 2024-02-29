import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { EmployeService } from 'src/app/client/service/employe.service';
import { TokenService } from 'src/app/client/service/token.service';
import { RendezVous } from 'src/app/model/rendezVous.model';
import { addDuree } from 'src/app/util/util';

@Component({
  selector: 'app-suivitache',
  templateUrl: './suivitache.component.html',
  styleUrls: ['./suivitache.component.css']
})
export class SuivitacheComponent {
  rdvR=new RendezVous();
  listeRdv: any[] = [];
  commission=0.0;
  photo:string|null="";
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private employeApi: EmployeApi,
    private renderer: Renderer2,
    private employeService: EmployeService
  ){
    this.getListeRdv();
    this.getCommission();
  }
  getCommission():void{
    const today = new Date('2024-03-04T00:00:00Z');
    const formattedDate = today.toISOString().split('T')[0];
    this.employeApi.commissionNow(formattedDate).subscribe(
      (commission) => {
        this.commission = commission;
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  }
  getListeRdv(): void {
    const today = new Date('2024-03-11T11:00:00Z');
    const formattedDate = today.toISOString().split('T')[0];
    this.employeApi.RdvNow(formattedDate).subscribe(
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
  updateRdv(id:string):void{
    this.employeApi.getRdv(id).subscribe(
      (rdv) => {
        this.rdvR=rdv;
        // console.log(rdv);
        const currentDate = new Date("2024-03-04T13:30:00Z");
        console.log(currentDate);
        const startDate = new Date(rdv.date);
        console.log(startDate); // Supposons que rdv.date contient la date de début du rendez-vous
        const endDate = addDuree(new Date(rdv.date), rdv.service.duree);
        console.log(endDate); // Ajoutez la durée du service en minutes à la date de début
    
        if (currentDate >= endDate) {
          this.rdvR.etat="Effectué"
          this.employeApi.updateRdv(this.rdvR).subscribe(
            (data)=>{
              this.getListeRdv();
            },
            (error)=>{
              alert(error.error.message);
            }
          );
          // Affichez une erreur ou effectuez une action appropriée
          console.error("Impossible de modifier le rendez-vous actuellement en cours.");
        } else {
          alert("vous n'avez pas encore terminer ce service");
        }
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  } 
  ngOnInit(): void {
    // Récupérez l'ID de l'employé à partir du TokenService
    if(this.employeService.getPhoto()){
      this.photo=this.employeService.getPhoto();
    }
    
  }
  
}
