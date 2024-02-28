import { Component, Input } from '@angular/core';
import { ManagerApi } from 'src/app/api/manager.api';

@Component({
  selector: 'app-moyenne',
  templateUrl: './moyenne.component.html',
  styleUrls: ['./moyenne.component.css']
})
export class MoyenneComponent {
  @Input() employeId: string=""; // Input pour recevoir l'ID de l'employé
  moyenne: number= 0;

  constructor(private managerApi: ManagerApi) { }

  ngOnInit(): void {
    this.getAverage();
  }

  getAverage(): void {
    // Utilisez managerApi pour récupérer la moyenne en fonction de l'employéId
    this.managerApi.moyenneHeureTravail(this.employeId).subscribe(
      (result) => {
        this.moyenne = result;
      },
      (error) => {
        alert(error.error.message);
        console.error('Erreur lors de la récupération de la moyenne :', error);
      }
    );
  }
}
