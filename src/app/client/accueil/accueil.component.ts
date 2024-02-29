import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApi } from 'src/app/api/client.api';
import { PreferenceApi } from 'src/app/api/preference.api';
import { ServiceApi } from 'src/app/api/service.api';
import { Service } from 'src/app/model/service.model';
import { formatNumber } from 'src/app/util/util';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  formatNumber: (value: number) => string = formatNumber;

  services: Service[]= [];
  listeClient: any[] = [];
  erreurRecuperationClients: string = '';
  message: string = '';
  success: boolean = false;

  constructor(
    private clientApi: ClientApi,
    private serviceApi: ServiceApi,
    private preferenceApi: PreferenceApi,
    private router: Router
  ) {
    this.loadServices();
  }

  ngOnInit(): void {

  }

  test(): void {
    console.log("test: ", this.services);
  }

  takeRendezVous(idService: string | undefined): void {
    if(idService) {
      this.router.navigate([`/client/rendezvous/${idService}`]);
    } else {
      console.log("idService undefined");
    }
  }

  loadServices(): void {
    this.serviceApi.allServicesForClient().subscribe((data) => {
      this.services = data.services.sort((a: Service, b: Service) => {
        if(b.isPreference && a.isPreference){
          b.isPreference - a.isPreference
        }
      });
    })
  }

  getListeClients(): void {
    this.clientApi.getListeClient().subscribe(
      (clients) => {
        this.listeClient = clients;
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  setPreference(idService: string, value: number) {
    const service = this.services.find(service => service._id === idService);
    if(service) {
      service.isPreference = value;
    }
  }

  addPreference(idService: string | undefined): void {
    if(!idService) return;
    this.preferenceApi.addPreference(idService, 'service').subscribe({
      next: data => {
        this.setPreference(idService, 1);
        this.success = true;
        this.message = data.message;
      },
      error: error => {
        this.success = false;
        this.message = error.error.message;
      }
    })
  }

  removePreference(idService: string | undefined): void {
    if(!idService) return;
    this.preferenceApi.removePreference(idService).subscribe({
      next: data => {
        this.setPreference(idService, 0);
        this.success = true;
        this.message = data.message;
      },
      error: error => {
        this.success = false;
        this.message = error.error.message;
      }
    })
  }
}
