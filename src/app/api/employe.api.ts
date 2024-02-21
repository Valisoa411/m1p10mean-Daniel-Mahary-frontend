import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';

@Injectable({
  providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class EmployeApi {
  constructor(private http: HttpClient) {}

  getEmployeHoraires(idEmploye: string): Observable<any> {
    return this.http.get(env.hostEmploye + '/horaire/' + idEmploye);
  }
}
