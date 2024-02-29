import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../../model/client.model';
import { ClientApi } from '../../api/client.api';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  client: Client = new Client(
    // undefined,
    // 'RAKOTONIRAINY',
    // 'Daniel',
    // 'valisoa.daniel@gmail.com',
    // '12345678',
    // 'Homme',
    // '2003-04-11',
    // undefined,
  );
  requiredInput: string[] = [
    'nom',
    'prenom',
    'genre',
    'dateNaissance',
    'email',
    'mdp',
    'confirmMdp',
  ];
  inputErrors: any = {};
  success: boolean = false;
  message: string = "";

  constructor(
    private clientApi: ClientApi,
    private router: Router
  ) { }

  test() {
    console.log("test: ", this.client);

  }

  onGenreChange(event: any): void {
    Object.keys(event).forEach(key => console.log("key: ", key))
  }

  onDateNaissanceChange() {
    if(this.client.dateNaissance && new Date(this.client.dateNaissance).getTime() > new Date().getTime()){
      this.inputErrors.dateNaissance = "Date de naissance doit être antérieure à la date actuelle"
    } else {
      this.inputErrors.dateNaissance = null
    }
  }

  onPasswordChange() {
    const mdp = this.client.mdp;
    this.inputErrors.mdp = (mdp && mdp.length < 8)
      ? "Le mot de passe doit contenir 8 charactères"
      : null
  }

  onConfirmPasswordChange(newConfirmMdp: string) {
    this.inputErrors.confirmMdp = (newConfirmMdp !== this.client.mdp)
      ? "Le mot de passe est différent"
      : null
  }

  isClientValid(form: NgForm) {
    this.inputErrors['email'] = null;
    this.requiredInput.forEach(key => {
      if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
        this.inputErrors[key] = `Le champ ${key} est requis`;
      } else {
        this.inputErrors[key] = null;
      }
    });
    const email = form.value['email'];
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.inputErrors['email'] = "Email invalid";
    }
  }

  isErrorExisting(): boolean {
    return Object.keys(this.inputErrors).some(key => {
      return !!this.inputErrors[key];
    })
  }

  signUpClient(form: NgForm): void {
    this.isClientValid(form);

    if (!this.isErrorExisting()) {
      this.clientApi.signUpClient(this.client).subscribe({
        next: (data) => {
          console.log("signUpClient: ", data);

          const extra: NavigationExtras = {
            state: {
              data: {
                email: this.client.email
              }
            }
          }
          this.router.navigate(['/client/waiting'], extra);
        },
        error: (error) => {
          this.success = false;
          this.message = error.error.message;
        }
      });
    }
  }
}
