import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApi } from 'src/app/api/client.api';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  listeClient: any[] = [];
  erreurRecuperationClients: string = '';

  constructor(private clientApi: ClientApi,private route: Router) {}

  ngOnInit(): void {
    this.getListeClients();
  }

  getListeClients(): void {
    this.clientApi.getListeClient().subscribe(
      (clients) => {
        this.listeClient = clients;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des clients :', error);
        if (error.status === 401 && error.error && error.error.error === 'Token expired') {
          // Rediriger vers la page de login en cas d'expiration du token
          this.route.navigate(['/signin']);
        }else{
          this.route.navigate(['/signin']);
        }
      }
    );
  }
}