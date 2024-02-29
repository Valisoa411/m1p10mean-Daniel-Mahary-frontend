import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { TokenService } from '../client/service/token.service';
import { getHeaders } from '../util/util';

@Injectable({
    providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class ClientApi {
  constructor(private http: HttpClient,private tokenService: TokenService) {}

  getNotifications(): Observable<any> {
    return this.http.get(env.hostClient + '/notification', {headers: getHeaders()})
  }

  checkNotification(idNotification: string): Observable<any> {
    return this.http.put(env.hostClient + '/notification/check', {idNotification}, {headers: getHeaders()})
  }

  signUpClient(clientData: any): Observable<any> {
    return this.http.post(env.hostClient + '/signup', clientData)
  }
  signInClient(clientData: any): Observable<any> {
    return this.http.post(env.hostClient + '/signin', clientData)
  }
  envoyerParametreAuBackend(parametre: string): Observable<any> {
    const url = env.hostClient + '/validation/'+parametre;
    const data = { }; // Assurez-vous que la structure correspond à celle attendue par votre backend
    return this.http.put(url, data);
  }
  getListeClient(): Observable<any[]> {
    const url = env.hostClient+"/liste_client";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const token = this.tokenService.getToken();

    // Ajoutez le token comme en-tête d'autorisation
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    // Utilisez les en-têtes dans la requête HTTP
    return this.http.get<any[]>(url, { headers });
  }
  logout():void{
    this.tokenService.removeToken();
  }

  updateRdv(datardv:any): Observable<any> {
    const options = { headers: getHeaders() };
    return this.http.put(env.hostClient + "/updateRdv",datardv, options);
  }
  getRdv(id:string): Observable<any> {
    return this.http.get(env.hostClient + '/rdv/'+id,{headers:getHeaders()});
  }
  getListeRdv(page:number,limit:number): Observable<any[]> {
    const url = env.hostClient+"/listeRdv";  // Remplacez par l'endpoint réel de votre API

    // Récupérez le token du service de gestion du token
    const params = new HttpParams().set('page', page).set('limit',limit);
    const options = { params: params, headers: getHeaders() };

    // Utilisez les en-têtes dans la requête HTTP
    return this.http.get<any[]>(url, options);
  }
  searchRdv(date1: string,date2: string,page:number,limit:number): Observable<any[]> {
    const params = new HttpParams().set('date1', date1)
    .set('date2', date2).set('page', page).set('limit',limit);
    const options = { params: params, headers: getHeaders() };
    return this.http.get<any[]>(env.hostClient+'/searchRdv', options);
  }

}
