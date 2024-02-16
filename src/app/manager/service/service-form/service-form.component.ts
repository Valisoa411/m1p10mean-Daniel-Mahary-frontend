import { Component, Input, OnInit } from '@angular/core';
import { ServiceApi } from 'src/app/api/service.api';
import { Service } from 'src/app/model/service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  @Input() selectedService?: Service;

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
  isUpdate: boolean = false;

  constructor(
    private serviceApi: ServiceApi
  ) {}

  ngOnInit(): void {
    this.isUpdate = !!this.selectedService;
    if(this.selectedService){
      this.service = {...this.selectedService};
    }
  }

  // onNbEmployeChange() {
  //   if (this.service.nbEmploye!==undefined && this.service.nbEmploye === 0) {
  //     console.log("error0");
  //     this.service.nbEmploye = 1;
  //   }
  //   if (this.service.nbEmploye && this.service.nbEmploye < 1) {
  //     console.log("error1");
  //     this.service.nbEmploye = 1;
  //   }
  // }

  onNbEmployeChange() {
    const sanitizedValue = Math.max(1, this.service.nbEmploye ? this.service.nbEmploye : 1);
    this.service.nbEmploye = sanitizedValue;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result?.toString(); // Extract base64 data
        this.service.photo = base64Data;
      };
      reader.readAsDataURL(file);
    }
  }

  test() {
    console.log("test: ", this.service);
    console.log("test selected: ", this.selectedService);
  }

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

  updateService(): void {
    this.serviceApi.updateService(this.service).subscribe({
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
