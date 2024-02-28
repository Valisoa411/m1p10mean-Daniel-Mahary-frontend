import { Component } from '@angular/core';
import { OffreSpecialApi } from 'src/app/api/offreSpecial.api';
import { OffreSpecial } from 'src/app/model/offreSpecial.model';

@Component({
  selector: 'app-offre-special',
  templateUrl: './offre-special.component.html',
  styleUrls: ['./offre-special.component.css']
})
export class OffreSpecialComponent {
  offreSpecials: OffreSpecial[] = [];
  selectedOffreSpecial: OffreSpecial | undefined;
  create: boolean = false;
  update: boolean = false;
  delete: boolean = false;
  message: string = '';
  success: boolean = false;

  constructor(private offreSpecialApi: OffreSpecialApi) {
    this.loadOffreSpecials();
  }

  clearScreen() {
    this.selectedOffreSpecial = undefined;
    this.create = false;
    this.update = false;
    this.delete = false;
  }

  openCreateForm() {
    this.create = true;
    this.update = false;
    this.delete = false;
  }

  openUpdateForm(offreSpecial: OffreSpecial) {
    this.selectedOffreSpecial = offreSpecial;
    this.create = false;
    this.update = true;
    this.delete = false;
  }

  openDeleteConfirmation(offreSpecial: OffreSpecial) {
    this.selectedOffreSpecial = offreSpecial;
    this.create = false;
    this.update = false;
    this.delete = true;
  }

  pushToOffreSpecials(offreSpecial: OffreSpecial) {
    this.offreSpecials.push(offreSpecial);
  }

  loadOffreSpecials(): void {
    this.offreSpecialApi.allOffreSpecials().subscribe((data) => {
      this.offreSpecials = data.offreSpecials;
    })
  }

  directDelete(offreSpecial: OffreSpecial): void {
    this.selectedOffreSpecial = offreSpecial;
    this.deleteOffreSpecial();
  }

  deleteOffreSpecial(): void {
    if (this.selectedOffreSpecial && this.selectedOffreSpecial._id) {
      this.offreSpecialApi.deleteOffreSpecial(this.selectedOffreSpecial?._id).subscribe({
        next: (data) => {
          this.offreSpecials = this.offreSpecials.filter(offreSpecial => offreSpecial._id !== this.selectedOffreSpecial?._id);
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
