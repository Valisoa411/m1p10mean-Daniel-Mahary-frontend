import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HoraireApi } from 'src/app/api/horaire.api';
import { Horaire } from 'src/app/model/horaire.model';
import { jourSemaine } from 'src/app/util/data';

@Component({
  selector: 'app-horaire-form',
  templateUrl: './horaire-form.component.html',
  styleUrls: ['./horaire-form.component.css']
})
export class HoraireFormComponent implements OnInit {
  @Input() idEmploye?: string;
  @Input() selectedHoraire?: Horaire;

  requiredInput: string[] = [
    'jour',
    'debut',
    'fin',
  ]
  jourSemaine: string[] = jourSemaine;
  horaire: Horaire = new Horaire();
  inputErrors: any = {};
  succes: boolean = false;
  message: string = "";
  isUpdate: boolean = false;

  constructor(
    private horaireApi: HoraireApi
  ) {}

  ngOnInit(): void {
    this.isUpdate = !!this.selectedHoraire;
    if (this.selectedHoraire) {
      this.horaire = {
        ...this.selectedHoraire,
        idEmploye: this.idEmploye,
      };
    } else {
      this.horaire = new Horaire(undefined, this.idEmploye);
    }
  }

  test(){
    console.log("test: ", this.horaire);
    console.log("test: ", this.idEmploye);

  }

  isHoraireValid(form: NgForm) {
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

  errorKeys(){
    return Object.keys(this.inputErrors);
  }

  addHoraire(form: NgForm) {
    console.log("addHoraire");
    this.isHoraireValid(form);
    if(!this.isErrorExisting()) {
      this.horaireApi.addHoraire(this.horaire).subscribe({
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

  updateHoraire(form: NgForm) {
    console.log("updateHoraire");
    this.isHoraireValid(form);
    if(!this.isErrorExisting()) {
      this.horaireApi.updateHoraire(this.horaire).subscribe({
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
}
