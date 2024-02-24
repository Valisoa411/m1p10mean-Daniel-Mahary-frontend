import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OffreSpecialApi } from 'src/app/api/offreSpecial.api';
import { ServiceApi } from 'src/app/api/service.api';
import { OffreSpecial } from 'src/app/model/offreSpecial.model';
import { Service } from 'src/app/model/service.model';

@Component({
  selector: 'app-offre-special-form',
  templateUrl: './offre-special-form.component.html',
  styleUrls: ['./offre-special-form.component.css']
})
export class OffreSpecialFormComponent implements OnInit {
  @Input() selectedOffreSpecial?:  OffreSpecial;
  @Output() onClose = new EventEmitter<void>();

  offreSpecial: OffreSpecial = new OffreSpecial();
  services: Service[] = [];

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
      if(this.selectedOffreSpecial) {
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
    this.offreSpecialApi.addOffreDispo(this.offreSpecial).subscribe({
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

  updateOffreSpecial(form: NgForm): void {
    this.offreSpecialApi.updateOffreDispo(this.offreSpecial).subscribe({
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
