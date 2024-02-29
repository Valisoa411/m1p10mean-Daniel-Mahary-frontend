import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { Depense } from 'src/app/model/depense.model';
import { TypeDepense } from 'src/app/model/typeDepense.model';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent {
  depense: Depense = new Depense();
  listeDepense: Depense[] = [];
  typedepense:TypeDepense[]=[];
  typedepensecible:TypeDepense=new TypeDepense();
  idtypedepense:string="";
  constructor(private managerAPi: ManagerApi,private router:Router,private renderer: Renderer2){
    this.loadTypeDepense();
  }
  createDepense():void{
    this.managerAPi.getTypeDepenseId(this.idtypedepense).subscribe(
      {next: (data) => {
        this.typedepensecible = data;
        this.depense.typedepense=this.typedepensecible;
        console.log(this.depense)
        this.managerAPi.createDepense(this.depense).subscribe(
          {
            next:(data)=>{
              this.router.navigate(['manager/listeDepense']);
            },
            error:(error)=>{
              alert(error.error.message);
            }
          }
        );
      },
      error: (error) => {
        alert(error.error.message);
      }});
  }
  loadTypeDepense(): void {
    this.managerAPi.getAllTypeDepenses().subscribe(
      {next: (data) => {
        this.typedepense = data;
      },
      error: (error) => {
        alert(error.error.message);
      }})
  }
  logout():void{
    this.managerAPi.logout();
    this.router.navigate(['manager/login']);
  }
}
