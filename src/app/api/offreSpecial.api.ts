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

  addOffreSpecial(offreSpecialData: any): Observable<any> {
    return this.http.post(`${env.hostManager}/offreSpecial`, offreSpecialData, { headers: getHeaders() });
  }

  allOffreSpecials(): Observable<any> {
    return this.http.get(`${env.hostManager}/offreSpecial`, { headers: getHeaders() });
  }

  getOffreSpecial(idOffreSpecial: string): Observable<any> {
    return this.http.get(`${env.hostManager}/offreSpecial/${idOffreSpecial}`, { headers: getHeaders() });
  }

  updateOffreSpecial(offreSpecialData: any): Observable<any> {
    return this.http.put(`${env.hostManager}/offreSpecial`, offreSpecialData, { headers: getHeaders() });
  }

  deleteOffreSpecial(idOffreSpecial: string): Observable<any> {
    return this.http.delete(`${env.hostManager}/offreSpecial/${idOffreSpecial}`, { headers: getHeaders() });
  }
}
