import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { getHeaders } from '../util/util';

@Injectable({
  providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class RendezVousApi {
  constructor(private http: HttpClient) { }

  addRendezVous(rendezVousData: any): Observable<any> {
    return this.http.post(`${env.hostClient}/rendezVous`, rendezVousData, { headers: getHeaders() });
  }
  updateRendezVous(rendezVousData: any): Observable<any> {
    return this.http.put(`${env.hostClient}/rendezVous`, rendezVousData, { headers: getHeaders() });
  }
}
