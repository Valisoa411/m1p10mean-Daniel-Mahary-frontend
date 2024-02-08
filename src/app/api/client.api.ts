import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';
import { Injectable } from '@angular/core';
import env from '../config/env';

@Injectable({
    providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class ClientApi {
  constructor(private http: HttpClient) {}

  signUpClient(clientData: any): Observable<any> {
    const res = this.http.post(env.hostClient + '/signup', clientData)
    console.log("signUpClient res: ", res);
    return res;
  }
}
