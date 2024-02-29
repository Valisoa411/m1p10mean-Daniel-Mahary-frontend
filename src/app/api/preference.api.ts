import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { getHeaders } from '../util/util';

@Injectable({
  providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class PreferenceApi {
  constructor(private http: HttpClient) { }

  addPreference(idObject: string, type: string): Observable<any> {
    const data = {
      idObject,
      type,
    }
    return this.http.post(`${env.hostClient}/addPreference`, data, { headers: getHeaders() });
  }

  removePreference(idObject: string): Observable<any> {
    return this.http.delete(`${env.hostClient}/removePreference/${idObject}`, { headers: getHeaders() });
  }
}
