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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  is_search=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private managerApi: ManagerApi,
    private renderer: Renderer2
  ){
    this.is_search=false;
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
  getListeRdv(): void {
    this.managerApi.getListeRdv(this.employeeId,this.currentPage,this.itemsPerPage).subscribe(
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
  logout():void{
    this.managerApi.logout();
    this.router.navigate(['manager/login']);
  }
  searchRdvDate():void{
    if(!this.is_search){
      this.is_search=true;
      this.currentPage=1;
    }
    this.managerApi.searchRdv(this.employeeId,this.date1,this.date2,this.currentPage,this.itemsPerPage).subscribe(
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
