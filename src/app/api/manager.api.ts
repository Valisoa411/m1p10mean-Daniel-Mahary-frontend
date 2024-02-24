import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { TokenService } from '../client/service/token.service';
import { getHeaders } from '../util/util';

@Injectable({
    providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class ManagerApi {
  constructor(private http: HttpClient,private tokenService: TokenService) {

  }

  createEmploye(employeeData: any, photo: File): Observable<any> {
    const formData = new FormData();

    formData.append('nom', employeeData.nom);
    formData.append('prenom', employeeData.prenom);
    formData.append('cin', employeeData.cin);
    formData.append('genre', employeeData.genre);
    formData.append('login', employeeData.login);
    formData.append('mdp', employeeData.mdp);
    formData.append('photo', photo);



    return this.http.post(env.hostManager + "/createEmploye", formData, {headers : getHeaders()});
  }

  getListeEmploye(): Observable<any[]> {
    const url = env.hostManager+"/listEmploye";  // Remplacez par l'endpoint réel de votre API
    return this.http.get<any[]>(url,{headers :getHeaders()});
  }

  deleteEmploye(employeeId: string): Observable<any> {
    return this.http.delete(env.hostManager + "/deleteEmploye/"+employeeId,{headers: getHeaders()});
  }

  loginManager(managerCredentials: any): Observable<any> {
    return this.http.post(env.hostManager + '/login', managerCredentials)
  }

  searchEmployes(term: string): Observable<any[]> {
    const params = new HttpParams().set('q', term);
    return this.http.get<any[]>(env.hostManager+'/search', { params });
  }
}
