import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.css']
})
export class CreateEmployeComponent {
  employe: Employe = new Employe();
  photoFile: File = new File([], '');
  constructor(private managerAPi: ManagerApi,private router:Router) {

  }
  onPhotoChange(event: any): void {
    this.photoFile = event.target.files[0];
  }

  createEmploye(): void {
    console.log(this.photoFile);
    this.managerAPi.createEmploye(this.employe,this.photoFile).subscribe((data) => {
      console.log('employé créé avec succès :', data);
      this.router.navigate(['/listEmploye']);
    });
    
  }
}
