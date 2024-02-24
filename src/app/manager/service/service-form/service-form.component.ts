import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceApi } from 'src/app/api/service.api';
import { Service } from 'src/app/model/service.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  @Input() selectedService?: Service;
  @Output() onClose = new EventEmitter<void>();

  service: Service = new Service();
  requiredInput: string[] = [
    'nom',
    'prix',
    'duree',
    'commission',
  ]
  inputErrors: any = {};
  success: boolean = false;
  message: string = "";
  isUpdate: boolean = false;

  constructor(
    private serviceApi: ServiceApi
  ) { }

  ngOnInit(): void {
    // console.log("handleClose: ", this.handleClose);

    this.isUpdate = !!this.selectedService;
    if (this.selectedService) {
      this.service = { ...this.selectedService };
    }
  }

  emitClose() {
    this.onClose.emit();
  }

  onNbEmployeChange() {
    const sanitizedValue = Math.max(1, this.service.nbEmploye ? this.service.nbEmploye : 1);
    this.service.nbEmploye = sanitizedValue;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const maxSizeInBytes = 512 * 1024; // 512 KB
      if (!file.type.startsWith('image/')) {
        this.inputErrors.photo = "Le fichier selectioner n'est pas une image"
        return;
      } else if (file.size > maxSizeInBytes) {
        this.inputErrors.photo = "Le fichier dépasse la taille maximum (512 KB)"
        return;
      } else {
        this.inputErrors.photo = null;
      }

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

  isServiceValid(form: NgForm) {
    this.requiredInput.forEach(key => {
      if (!form.value[key] || (typeof form.value[key] === "string" && form.value[key] === "")) {
        this.inputErrors[key] = `Le champ ${key} est requis`;
      } else {
        this.inputErrors[key] = null;
      }
    })
  }

  isErrorExisting(): boolean {
    return Object.keys(this.inputErrors).some(key => {
      return !!this.inputErrors[key];
    })
  }

  addService(form: NgForm): void {
    this.isServiceValid(form);
    if (!this.isErrorExisting()) {
      this.serviceApi.addService(this.service).subscribe({
        next: (data) => {
          this.success = true;
          this.message = data.message;
        },
        error: (error) => {
          this.success = false;
          this.message = error.error.message;
        }
      })
    }
  }

  updateService(form: NgForm): void {
    this.isServiceValid(form);
    if (!this.isErrorExisting()) {
      this.serviceApi.updateService(this.service).subscribe({
        next: (data) => {
          this.success = true;
          this.message = data.message;
        },
        error: (error) => {
          this.success = false;
          this.message = error.error.message;
        }
      })
    }
  }
}
