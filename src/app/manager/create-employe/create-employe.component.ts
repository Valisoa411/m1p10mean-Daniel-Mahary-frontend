import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { Employe } from 'src/app/model/employe.model';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.css']
})
export class CreateEmployeComponent {
  employe: Employe = new Employe();
  photoFile: File = new File([], '');
  selectedFileName: string = '';
  requiredInput: string[] = [
    'nom',
    'prenom',
    'genre',
    'login',
    'mdp',
    'cin',
  ];
  inputErrors: any = {};

  // faEye = faEye;
  // faEyeSlash = faEyeSlash;

  showPassword: boolean = false;

  // Autres méthodes du composant

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  
  constructor(private managerAPi: ManagerApi,private router:Router,private renderer: Renderer2) {

  }

  onPhotoChange(event: any): void {
    this.photoFile = event.target.files[0];
    this.selectedFileName = this.photoFile.name;
  }

  onPhotoUploadClick(): void {
    const fileInput = this.renderer.selectRootElement('#photo');
    this.renderer.setProperty(fileInput, 'value', null);
    fileInput.click();
  }

  onPasswordChange() {
    const mdp = this.employe.mdp;
    this.inputErrors.mdp = (mdp && mdp.length != 8)
      ? "Le mot de passe doit contenir 8 charactères"
      : null
  }
  onCinChange() {
    const mdp = this.employe.cin;
    
    
    this.inputErrors.cin = (mdp && mdp.toString().length != 8)
      ? "Le cin doit contenir 8 chiffres"
      : null
  }

  isEmployeValid(form: NgForm) {
    this.inputErrors['login'] = null;
    this.requiredInput.forEach(key => {
      if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
        this.inputErrors[key] = `Le champ ${key} est requis`;
      } else {
        this.inputErrors[key] = null;
      }
    });
    const email = form.value['login'];
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.inputErrors['login'] = "login invalid";
    }
  }

  isErrorExisting(): boolean {
    return Object.keys(this.inputErrors).some(key => {
      return !!this.inputErrors[key];
    })
  }

  createEmploye(form: NgForm): void {
    this.isEmployeValid(form);

    if (!this.isErrorExisting()) {
      
      this.managerAPi.createEmploye(this.employe,this.photoFile).subscribe({
        next: (data) => {
          console.log('employé créé avec succès :', data);
          this.router.navigate(['manager/listEmploye']);
        },
        error: (error) => {
          alert(error.error.message);
        }
         
      });
    }
  
  }

  logout():void{
    this.managerAPi.logout();
    this.router.navigate(['manager/login']);
  }
}
