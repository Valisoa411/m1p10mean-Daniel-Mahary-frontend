import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';

@Injectable({
  providedIn: 'root', // Cela enregistre le horaire au niveau du module racine (AppModule)
})

export class HoraireApi {
  constructor(private http: HttpClient) {}

  addHoraire(horaireData: any): Observable<any> {
    return this.http.post(env.hostEmploye + '/horaire', horaireData);
  }

  allHoraires(): Observable<any> {
    return this.http.get(env.hostEmploye + '/horaire');
  }

  getHoraire(idHoraire: string): Observable<any> {
    return this.http.get(env.hostEmploye + '/horaire/' + idHoraire);
  }

  updateHoraire(horaireData: any): Observable<any> {
    return this.http.put(env.hostEmploye + '/horaire', horaireData);
  }

  deleteHoraire(idHoraire: string): Observable<any> {
    return this.http.delete(env.hostEmploye + '/horaire/' + idHoraire);
  }
}
