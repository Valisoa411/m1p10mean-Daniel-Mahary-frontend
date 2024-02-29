import { Component } from '@angular/core';
import { EmployeApi } from 'src/app/api/employe.api';
import { PreferenceApi } from 'src/app/api/preference.api';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-client-list-employe',
  templateUrl: './client-list-employe.component.html',
  styleUrls: ['./client-list-employe.component.css']
})
export class ClientListEmployeComponent {
  employes: Employe[] = [];
  message: string = '';
  success: boolean = false;

  constructor(
    private employeApi: EmployeApi,
    private preferenceApi: PreferenceApi
  ){
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeApi.allEmployesForClient().subscribe((data) => {
      this.employes = data.employes.sort((a: Employe, b: Employe) => {
        if(b.isPreference && a.isPreference){
          b.isPreference - a.isPreference
        }
      });
    })
  }

  setPreference(idEmploye: string, value: number) {
    const employe = this.employes.find(employe => employe._id === idEmploye);
    if(employe) {
      employe.isPreference = value;
    }
  }

  addPreference(idEmploye: string | undefined): void {
    if(!idEmploye) return;
    this.preferenceApi.addPreference(idEmploye, 'employe').subscribe({
      next: data => {
        this.setPreference(idEmploye, 1);
        this.success = true;
        this.message = data.message;
      },
      error: error => {
        this.success = false;
        this.message = error.error.message;
      }
    })
  }

  removePreference(idEmploye: string | undefined): void {
    if(!idEmploye) return;
    this.preferenceApi.removePreference(idEmploye).subscribe({
      next: data => {
        this.setPreference(idEmploye, 0);
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
