import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';

@Injectable({
    providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class ManagerApi {
  constructor(private http: HttpClient) {}

  loginManager(managerCredentials: any): Observable<any> {
    return this.http.post(env.hostManager + '/login', managerCredentials)
  }
}
