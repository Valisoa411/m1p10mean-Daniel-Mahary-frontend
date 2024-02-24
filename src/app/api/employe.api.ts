import { HttpClient,HttpHeaders } from '@angular/common/http';
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

  getEmployeHoraires(idEmploye: string): Observable<any> {
    return this.http.get(env.hostEmploye + '/horaire/' + idEmploye);
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
}
