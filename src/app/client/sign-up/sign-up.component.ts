import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../../model/client.model';
import { ClientApi } from '../../api/client.api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  client: Client = new Client();
  requiredField: string[] = [
    'nom',
    'prenom',
    'genre',
    'dateNaissance',
    'email',
    'mdp',
    'confirmMdp',
  ];
  signUpErrors: any = {};

  constructor(
    private clientApi: ClientApi,
  ) { }

  onPasswordChange() {
    const mdp = this.client.mdp;
    this.signUpErrors.mdp = (mdp && mdp.length < 8)
      ? "Le mot de passe doit contenir 8 charactères"
      : null
  }

  onConfirmPasswordChange(newConfirmMdp: string) {
    this.signUpErrors.confirmMdp = (newConfirmMdp !== this.client.mdp)
      ? "Le mot de passe est différent"
      : null
  }

  isClientValid(form: NgForm) {
    this.signUpErrors['email'] = null;
    this.requiredField.forEach(key => {
      if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
        this.signUpErrors[key] = `Le champ ${key} est requis`;
      } else {
        this.signUpErrors[key] = null;
      }
    });
    const email = form.value['email'];
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.signUpErrors['email'] = "Email invalid";
    }
  }

  isErrorExisting(): boolean{
    return Object.keys(this.signUpErrors).some(key => {
      return !!this.signUpErrors[key];
    })
  }

  signUpClient(form: NgForm): void {
    this.isClientValid(form);

    if(!this.isErrorExisting()){
      this.clientApi.signUpClient(this.client).subscribe((data) => {
        console.log("signUpClient data: ", data);
      })
    }
  }
}
