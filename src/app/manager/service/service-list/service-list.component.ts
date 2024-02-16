import { Component } from '@angular/core';
import { ServiceApi } from 'src/app/api/service.api';
import { Service } from 'src/app/model/service.model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
  services: Service[] = [];
  selectedService: Service | undefined;
  update: boolean = false;
  delete: boolean = false;
  message: string = '';
  succes: boolean = false;

  constructor(private serviceApi: ServiceApi) {
    this.loadServices();
  }

  clearScreen() {
    this.selectedService = undefined;
    this.update = false;
    this.delete = false;
  }

  openUpdateForm(service: Service) {
    this.selectedService = service;
    this.update = true;
  }

  openDeleteConfirmation(service: Service) {
    this.selectedService = service;
    this.delete = true;
  }

  loadServices(): void {
    this.serviceApi.allServices().subscribe((data) => {
      this.services = data.services;
    })
  }

  deleteService(): void {
    if (this.selectedService && this.selectedService._id) {
      this.serviceApi.deleteService(this.selectedService?._id).subscribe({
        next: (data) => {
          this.succes = true;
          this.message = data.message;
        },
        error: (error) => {
          this.succes = false;
          this.message = error.error.message;
        },
        complete: () => {
          this.clearScreen();
        }
      })
    }
  }
}
