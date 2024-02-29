import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { TypeDepense } from 'src/app/model/typeDepense.model';

@Component({
  selector: 'app-createdepense',
  templateUrl: './createdepense.component.html',
  styleUrls: ['./createdepense.component.css']
})
export class CreatedepenseComponent {
  typedepense: TypeDepense = new TypeDepense();
  
  constructor(private managerAPi: ManagerApi,private router:Router,private renderer: Renderer2) {

  }


  createTypeDepense(): void {
      console.log(this.typedepense);
      this.managerAPi.createTypeDepense(this.typedepense).subscribe({
        next: (data) => {
          console.log('employé créé avec succès :', data);
          this.router.navigate(['manager/listeDepense']);
        },
        error: (error) => {
          alert(error.error.message);
        }
      });
    }

  logout():void{
    this.managerAPi.logout();
    this.router.navigate(['manager/login']);
  }
}
