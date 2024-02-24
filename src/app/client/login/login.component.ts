import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientApi } from 'src/app/api/client.api';
import { Client } from 'src/app/model/client.model';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  client: Client = new Client();
  requiredField: string[] = [
    'email',
    'mdp'
  ];
  signInErrors: any = {};
  success: boolean = false;
  message: string = "";
  token: string ="";
  errorMessage: string="";

  constructor(
    private clientApi: ClientApi,
    private router : Router,
    private tokenService: TokenService
  ) { }

  onPasswordChange() {
    const mdp = this.client.mdp;
    this.signInErrors.mdp = (mdp && mdp.length < 8)
      ? "Le mot de passe doit contenir 8 charactères"
      : null
  }

  isClientValid(form: NgForm) {
    this.signInErrors['email'] = null;
    this.requiredField.forEach(key => {
      if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
        this.signInErrors[key] = `Le champ ${key} est requis`;
      } else {
        this.signInErrors[key] = null;
      }
    });
    const email = form.value['email'];
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.signInErrors['email'] = "Email invalid";
    }
  }

  isErrorExisting(): boolean {
    return Object.keys(this.signInErrors).some(key => {
      return !!this.signInErrors[key];
    })
  }

  signInClient(form: NgForm): void {
    this.isClientValid(form);

    if (!this.isErrorExisting()) {
      this.clientApi.signInClient(this.client).subscribe({
        next: (data) => {
          this.success = true;
          this.message = data.message;
          if (data.token) {
            this.token = data.token;
            console.log('Token reçu du backend :', this.token);

            this.tokenService.setToken(this.token);

            // Redirigez l'utilisateur vers la page d'accueil
            this.router.navigate(['/accueil']);
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
