import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { getHeaders } from '../util/util';

@Injectable({
  providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class OffreSpecialApi {
  constructor(private http: HttpClient) { }

  addOffreDispo(offreDispoData: any): Observable<any> {
    return this.http.post(`${env.hostManager}/offreDispo`, offreDispoData, { headers: getHeaders() });
  }

  allOffreDispos(): Observable<any> {
    return this.http.get(`${env.hostManager}/offreDispo`, { headers: getHeaders() });
  }

  getOffreDispo(idOffreDispo: string): Observable<any> {
    return this.http.get(`${env.hostManager}/offreDispo/${idOffreDispo}`, { headers: getHeaders() });
  }

  updateOffreDispo(offreDispoData: any): Observable<any> {
    return this.http.put(`${env.hostManager}/offreDispo`, offreDispoData, { headers: getHeaders() });
  }

  deleteOffreDispo(idOffreDispo: string): Observable<any> {
    return this.http.delete(`${env.hostManager}/offreDispo/${idOffreDispo}`, { headers: getHeaders() });
  }
}
