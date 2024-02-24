import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { TokenService } from 'src/app/client/service/token.service';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  employe: Employe = new Employe();
  requiredField: string[] = [
    'login',
    'mdp'
  ];
  signInErrors: any = {};
  succes: boolean = false;
  message: string = "";
  token: string ="";
  errorMessage: string="";

  constructor(
    private EmployeApi: EmployeApi,
    private router : Router,
    private tokenService: TokenService
  ) { }

  onPasswordChange() {
    const mdp = this.employe.mdp;
    // this.signInErrors.mdp = (mdp && mdp.length < 8)
    //   ? "Le mot de passe doit contenir 8 charactères"
    //   : null
  }

  isEmployeValid(form: NgForm) {
    this.signInErrors['login'] = null;
    this.requiredField.forEach(key => {
      if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
        this.signInErrors[key] = `Le champ ${key} est requis`;
      } else {
        this.signInErrors[key] = null;
      }
    });
    const email = form.value['login'];
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.signInErrors['login'] = "Email invalid";
    }
  }

  isErrorExisting(): boolean {
    return Object.keys(this.signInErrors).some(key => {
      return !!this.signInErrors[key];
    })
  }

  signInEmploye(form: NgForm): void {
    this.isEmployeValid(form);

    if (!this.isErrorExisting()) {
      this.EmployeApi.signInEmploye(this.employe).subscribe({
        next: (data) => {
          this.succes = true;
          this.message = data.message;
          if (data.token) {
            this.token = data.token;
            console.log('Token reçu du backend :', this.token);
  
            this.tokenService.setToken(this.token);
  
            // Redirigez l'utilisateur vers la page d'accueil
            this.router.navigate(['employe/accueilEmploye']);
          } else if (data.message) {
            this.errorMessage = data.message;
            // alert(this.errorMessage);
          }
        },
        error: (error) => {
          
          if (error.status === 401) {
            // C'est une erreur 401, accéder à la variable error directement
            this.message =error.error.error;
            // alert(this.message);
          } else {
            // C'est une autre erreur, utiliser le message d'erreur générique
            this.message = error.error.error;
            // alert(this.message);
          }
        }
      });
    }
  }
}
