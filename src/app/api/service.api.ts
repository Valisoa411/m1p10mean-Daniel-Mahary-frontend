import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';

@Injectable({
    providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class ServiceApi {
  constructor(private http: HttpClient) {}

  addService(serviceData: any): Observable<any> {
    return this.http.post(env.hostManager + '/service', serviceData);
  }

  allServices(): Observable<any> {
    return this.http.get(env.hostManager + '/service');
  }

  getService(idService: string): Observable<any> {
    return this.http.get(env.hostManager + '/service/' + idService);
  }

  updateService(serviceData: any): Observable<any> {
    return this.http.put(env.hostManager + '/service', serviceData);
  }

  deleteService(idService: string): Observable<any> {
    return this.http.delete(env.hostManager + '/service/' + idService);
  }
}
