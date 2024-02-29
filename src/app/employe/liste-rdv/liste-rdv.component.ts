import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { EmployeService } from 'src/app/client/service/employe.service';
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
  photo:string|null="";
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  is_search=false;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private employeApi: EmployeApi,
    private renderer: Renderer2,
    private employeService: EmployeService
  ){
    this.getListeRdv();
    this.is_search=false;
  }
  getListeRdv(): void {
    
    this.employeApi.getListeRdv(this.currentPage,this.itemsPerPage).subscribe(
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
  ngOnInit(): void {
    // Récupérez l'ID de l'employé à partir du TokenService
    if(this.employeService.getPhoto()){
      this.photo=this.employeService.getPhoto();
    }
    
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      if(!this.is_search){
        this.getListeRdv();
      }else{
        this.searchRdvDate();
      }
      
    }
  }
  logout():void{
    this.employeApi.logout();
    this.router.navigate(['employe/signin']);
  }
  searchRdvDate():void{
    if(!this.is_search){
      this.is_search=true;
      this.currentPage=1;
    }
    this.employeApi.searchRdv(this.date1,this.date2,this.currentPage,this.itemsPerPage).subscribe(
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
}
