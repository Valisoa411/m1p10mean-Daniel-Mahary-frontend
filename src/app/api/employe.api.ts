import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { TokenService } from '../client/service/token.service';
import { Employe } from '../model/employe.model';
import { getHeaders } from '../util/util';

@Injectable({
  providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class EmployeApi {
  constructor(private http: HttpClient,private tokenService: TokenService) {}

  getEmployeHoraires(): Observable<any> {
    return this.http.get(env.hostEmploye + '/horaire',{headers:getHeaders()});
  }
  // getEmploye(idEmploye: string): Observable<any> {
  //   return this.http.get(env.hostManager + '/' + idEmploye);
  // }

  signInEmploye(employeData: any): Observable<any> {
    return this.http.post(env.hostEmploye + '/signin', employeData, {headers: getHeaders()});
  }

  getEmploye(): Observable<any> {
    const url = env.hostEmploye+"/info_employe";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const token = this.tokenService.getToken();

    console.log(token);
    // Ajoutez le token comme en-tête d'autorisation
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    // Utilisez les en-têtes dans la requête HTTP
    return this.http.get<any>(url, { headers });
  }

  updateEmployeWithPic(employeeData: any, photo: File): Observable<any> {
    const formData = new FormData();

    formData.append('nom', employeeData.nom);
    formData.append('prenom', employeeData.prenom);
    formData.append('cin', employeeData.cin);
    formData.append('login', employeeData.login);
    formData.append('mdp', employeeData.mdp);
    formData.append('photo', photo);

    const token = this.tokenService.getToken();

    // Ajoutez le token comme en-tête d'autorisation
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.put(env.hostEmploye + "/updateEmployeWithPic", formData,{ headers });
  }

  updateEmploye(employeeData: any): Observable<any> {
    const formData = new FormData();

    formData.append('nom', employeeData.nom);
    formData.append('prenom', employeeData.prenom);
    formData.append('cin', employeeData.cin);
    formData.append('login', employeeData.login);
    formData.append('mdp', employeeData.mdp);

    const token = this.tokenService.getToken();

    // Ajoutez le token comme en-tête d'autorisation
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.put(env.hostEmploye + "/updateEmploye", formData,{ headers });
  }
  getListeRdv(page:number,limit:number): Observable<any[]> {
    const params = new HttpParams().set('page', page).set('limit',limit);
    const url = env.hostEmploye+"/listeRdv";  // Remplacez par l'endpoint réel de votre API

    const options = { params: params, headers: getHeaders() };

    // Utilisez les en-têtes dans la requête HTTP
    return this.http.get<any[]>(url, options);
  }
  logout():void{
    this.tokenService.removeToken();
  }

  searchRdv(date1: string,date2: string,page:number,limit:number): Observable<any[]> {
    const params = new HttpParams().set('date1', date1)
    .set('date2', date2).set('page', page).set('limit',limit);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(env.hostEmploye+'/searchRdv', options);
  }
  RdvNow(date: string,page:number,limit:number): Observable<any[]> {
    const params = new HttpParams().set('date', date).set('page', page).set('limit',limit);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(env.hostEmploye+'/rdvNow', options);
  }
  commissionNow(date: string): Observable<number> {
    const params = new HttpParams().set('date', date);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<number>(env.hostEmploye+'/commissionDay', options);
  }
  getRdv(id:string): Observable<any> {
    return this.http.get(env.hostEmploye + '/rdv/'+id,{headers:getHeaders()});
  }
  updateRdv(datardv:any): Observable<any> {
    const formData = new FormData();
    const options = { headers: getHeaders() };
  
    return this.http.put(env.hostEmploye + "/updateRdv",datardv, options);
  }
}
