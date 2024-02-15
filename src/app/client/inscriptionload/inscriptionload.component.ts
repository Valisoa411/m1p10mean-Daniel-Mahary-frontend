import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientApi } from 'src/app/api/client.api';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-inscriptionload',
  templateUrl: './inscriptionload.component.html',
  styleUrls: ['./inscriptionload.component.css'],
})
export class InscriptionloadComponent implements OnInit {
  monParametre: string;
  token: string;
  errorMessage: string;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private clientApi: ClientApi,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.monParametre = '';
    this.token = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.monParametre = params['id'];
      this.loading = true;

      // Démarrer le délai avant la requête vers le serveur
      setTimeout(() => {
        // Désactiver l'indicateur de chargement après le délai
        this.loading = false;

        // Démarrer la requête vers le serveur
        this.envoyerParametreAuBackend(this.monParametre);
      }, 4000);
    });
  }

  envoyerParametreAuBackend(parametre: string): void {
    this.loading = true;
    this.clientApi.envoyerParametreAuBackend(parametre).subscribe(
      (response) => {
        if (response.token) {
          this.token = response.token;
          console.log('Token reçu du backend :', this.token);

          this.tokenService.setToken(this.token);

          // Redirigez l'utilisateur vers la page d'accueil
          this.router.navigate(['/accueil']);
        } else if (response.message) {
          this.errorMessage = response.message;
          alert(this.errorMessage);
        }
      },
      (error) => {
        console.error('Erreur sur la validation :', error);
        this.errorMessage = 'Erreur sur la validation avec le serveur: '+error.message;
        alert(this.errorMessage);
      }
    );
  }
}
