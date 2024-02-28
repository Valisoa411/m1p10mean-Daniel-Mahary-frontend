import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OffreSpecialApi } from 'src/app/api/offreSpecial.api';
import { ServiceApi } from 'src/app/api/service.api';
import { OffreSpecial } from 'src/app/model/offreSpecial.model';
import { Service } from 'src/app/model/service.model';
import { isFormValid } from 'src/app/util/util';

@Component({
  selector: 'app-offre-special-form',
  templateUrl: './offre-special-form.component.html',
  styleUrls: ['./offre-special-form.component.css']
})
export class OffreSpecialFormComponent implements OnInit {
  @Input() selectedOffreSpecial?: OffreSpecial;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() offreSpecialEmitter: EventEmitter<OffreSpecial> = new EventEmitter<OffreSpecial>();

  offreSpecial: OffreSpecial = new OffreSpecial();
  services: Service[] = [];

  requiredInput: string[] = [
    'nom',
    'service',
    'reduction',
    'dateDebut',
    'dateFin',
  ]
  inputErrors: any = {};
  success: boolean = false;
  message: string = "";
  isUpdate: boolean = false;

  constructor(
    private offreSpecialApi: OffreSpecialApi,
    private serviceApi: ServiceApi,
  ) {
    this.loadServices();
  }

  ngOnInit(): void {
    this.isUpdate = !!this.selectedOffreSpecial;
    if (this.selectedOffreSpecial) {
      this.offreSpecial = { ...this.selectedOffreSpecial }
    }
  }

  emitClose() {
    this.onClose.emit();
  }

  loadServices(): void {
    this.serviceApi.allServices().subscribe((data) => {
      this.services = data.services;
    })
  }

  onServiceChange(index: number) {
    this.offreSpecial.service = this.services[index];
  }

  addOffreSpecial(form: NgForm): void {
    isFormValid(form, this.requiredInput, this.inputErrors);
    this.offreSpecialApi.addOffreSpecial(this.offreSpecial).subscribe({
      next: (data) => {
        // console.log("addOffreSpecial: ", data);
        this.offreSpecial._id = data.idOffreSpecial;
        this.offreSpecialEmitter.emit(this.offreSpecial);
        this.success = true;
        this.message = data.message;
      },
      error: (error) => {
        this.success = false;
        this.message = error.error.message;
      }
    })
  }

  updateOffreSpecial(form: NgForm): void {
    isFormValid(form, this.requiredInput, this.inputErrors);
    this.offreSpecialApi.updateOffreSpecial(this.offreSpecial).subscribe({
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
