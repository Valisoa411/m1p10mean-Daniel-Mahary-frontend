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
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(env.hostManager+'/search', options);
  }
  moyenneHeureTravail(idemploye: string): Observable<any> {
    const params = new HttpParams().set('idemploye',idemploye);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any>(env.hostManager+'/moyenneHeureTravail', options);
  }

  logout():void{
    this.tokenService.removeToken();
  }

  getListeRdv(idemploye:string): Observable<any[]> {
    const url = env.hostManager+"/listeRdv";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('idemploye',idemploye);
    const options = { params: params, headers: getHeaders() };

    // Utilisez les en-têtes dans la requête HTTP
    return this.http.get<any[]>(url, options);
  }
  searchRdv(idemploye:string,date1: string,date2: string): Observable<any[]> {
    const params = new HttpParams().set('date1', date1)
    .set('date2', date2).set('idemploye',idemploye);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(env.hostManager+'/searchRdv', options);
  }
  getEmploye(idemploye:string): Observable<any> {
    const url = env.hostManager+"/info_employe";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('idemploye',idemploye);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(url, options);
  }
  byDate(annee:number,mois:number): Observable<any> {
    const url = env.hostManager+"/byDate";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('annee',annee).set('mois',mois);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(url, options);
  }
  byMonth(annee:number): Observable<any> {
    const url = env.hostManager+"/byMonth";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('annee',annee);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(url, options);
  }
  byDateChiffreAffaire(annee:number,mois:number): Observable<any> {
    const url = env.hostManager+"/byDateChiffreAffaire";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('annee',annee).set('mois',mois);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(url, options);
  }
  byMonthChiffreAffaire(annee:number): Observable<any> {
    const url = env.hostManager+"/byMonthChiffreAffaire";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('annee',annee);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(url, options);
  }
  beneficeByMonth(annee:number): Observable<any> {
    const url = env.hostManager+"/beneficeByMonth";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('annee',annee);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(url, options);
  }
  createDepense(depenseData: any): Observable<any> {
    return this.http.post(env.hostManager + "/createDepense",depenseData, {headers : getHeaders()});
  }
  createTypeDepense(typeDepenseData: any): Observable<any> {
    return this.http.post(env.hostManager + "/createTypeDepense", typeDepenseData, {headers : getHeaders()});
  }
  getAllDepenses(): Observable<any[]> {
    return this.http.get<any[]>(env.hostManager + "/listeDepense", {headers : getHeaders()});
  }
  getAllTypeDepenses(): Observable<any[]> {
    return this.http.get<any[]>(env.hostManager + "/listeTypeDepense", {headers : getHeaders()});
  }
  getTypeDepenseId(idtypedepense:string): Observable<any> {
    const params = new HttpParams().set('idtypedepense', idtypedepense);
    const options = { params: params, headers: getHeaders() };
    return this.http.get(env.hostManager + "/getTypeDepense", options);
  }
  deleteDepense(iddepense: string|undefined): Observable<any> {
    return this.http.delete(env.hostManager + "/deleteDepense/"+iddepense,{headers: getHeaders()});
  }
}
