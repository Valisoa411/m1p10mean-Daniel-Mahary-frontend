import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';
import { Injectable } from '@angular/core';
import env from '../config/env';
import { TokenService } from '../client/service/token.service';

@Injectable({
    providedIn: 'root', // Cela enregistre le service au niveau du module racine (AppModule)
})

export class ClientApi {
  constructor(private http: HttpClient,private tokenService: TokenService) {}

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
  
}
