import { Component, NgModule } from '@angular/core';
import { ServiceApi } from 'src/app/api/service.api';
import { Service } from 'src/app/model/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  services: Service[] = [];
  selectedService: Service | undefined;
  create: boolean = false;
  update: boolean = false;
  delete: boolean = false;
  message: string = '';
  success: boolean = false;

  constructor(private serviceApi: ServiceApi) {
    this.loadServices();
  }

  clearScreen() {
    this.selectedService = undefined;
    this.create = false;
    this.update = false;
    this.delete = false;
  }

  openCreateForm() {
    this.create = true;
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
          this.success = true;
          this.message = data.message;
        },
        error: (error) => {
          this.success = false;
          this.message = error.error.message;
        },
        complete: () => {
          this.clearScreen();
        }
      })
    }
  }
}
