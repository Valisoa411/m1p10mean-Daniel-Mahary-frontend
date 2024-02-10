import { Component } from '@angular/core';
import { ServiceApi } from 'src/app/api/service.api';
import { Service } from 'src/app/model/service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent {
  service: Service = new Service();
  requiredInput: string[] = [
    'nom',
    'prix',
    'duree',
    'commission',
  ]
  inputErrors: any = {};
  succes: boolean = false;
  message: string = "";

  constructor(
    private serviceApi: ServiceApi
  ) {}

  addService(): void {
    this.serviceApi.addService(this.service).subscribe({
      next: (data) => {
        this.succes = true;
        this.message = data.message;
      },
      error: (error) => {
        this.succes = false;
        this.message = error.error.message;
      }
    })
  }
}
