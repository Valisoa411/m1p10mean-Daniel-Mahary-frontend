import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { getHeaders } from '../util/util';

@Injectable({
  providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class ServiceApi {
  constructor(private http: HttpClient) { }

  getAvailability(idService: string, selectedDate: string): Observable<any> {
    return this.http.get(`${env.hostClient}/availability`, {
      headers: getHeaders(),
      params: {
        idService,
        selectedDate,
      }
    });
  }

  getEmployeAvailable(idService: string, selectedDate: string): Observable<any> {
    return this.http.get(`${env.hostClient}/employeAvailable`, {
      headers: getHeaders(),
      params: {
        idService,
        selectedDate,
      }
    })
  }



  addService(serviceData: any): Observable<any> {
    return this.http.post(`${env.hostManager}/service`, serviceData, { headers: getHeaders() });
  }

  allServices(): Observable<any> {
    return this.http.get(`${env.hostManager}/service`, { headers: getHeaders() });
  }

  getService(idService: string): Observable<any> {
    return this.http.get(`${env.hostManager}/service/${idService}`, { headers: getHeaders() });
  }

  updateService(serviceData: any): Observable<any> {
    return this.http.put(`${env.hostManager}/service`, serviceData, { headers: getHeaders() });
  }

  deleteService(idService: string): Observable<any> {
    return this.http.delete(`${env.hostManager}/service/${idService}`, { headers: getHeaders() });
  }
}
