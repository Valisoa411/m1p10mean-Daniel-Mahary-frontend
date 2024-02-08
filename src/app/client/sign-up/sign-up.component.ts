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
  signUpErrors: any = {};

  constructor(
    private clientApi: ClientApi,
  ) {}

  isClientValid(inputedClient: Client) {
    for(const key in this.client) {

    }
  }

  signUpClient(form: NgForm): void {
    this.clientApi.signUpClient(this.client).subscribe((data) => {
      console.log("signUpClient data: ", data);

    })
  }

}
