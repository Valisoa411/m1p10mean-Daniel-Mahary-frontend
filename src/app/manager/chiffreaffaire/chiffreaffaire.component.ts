import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { Chart, registerables } from 'chart.js';

// Enregistrez les modules nécessaires (y compris le contrôleur de bar)
Chart.register(...registerables);

@Component({
  selector: 'app-chiffreaffaire',
  templateUrl: './chiffreaffaire.component.html',
  styleUrls: ['./chiffreaffaire.component.css']
})
export class ChiffreaffaireComponent {
  rendezVousData: any[] = [];
  chartByDay!: Chart;
  chartByMonth!: Chart;
  currentYear: number;
  selectedYearByMonth: number;
  selectedYearByDate: number;
  selectedMonth: number;

  constructor(private managerApi: ManagerApi, private route: Router) {
    this.currentYear = new Date().getFullYear();
    this.selectedYearByMonth = this.currentYear;
    this.selectedYearByDate = this.currentYear;
    this.selectedMonth = 1; // Valeur par défaut, par exemple, janvier
  }

  ngOnInit(): void {
    this.loadMonth();
    this.loadDate(); // Remplacez 2024 par l'année que vous souhaitez
  }

  ngOnDestroy(): void {
    // Détruire les graphiques lors de la destruction du composant
    if (this.chartByMonth) {
      this.chartByMonth.destroy();
    }
    if (this.chartByDay) {
      this.chartByDay.destroy();
    }
  }

  loadMonth(): void {
    // Détruire le graphique existant avant d'en créer un nouveau
    if (this.chartByMonth) {
      this.chartByMonth.destroy();
    }

    this.managerApi.byMonthChiffreAffaire(this.selectedYearByMonth).subscribe((data: any[]) => {
      console.log(data);
      const labels = data.map(entry => this.getMonthName(entry._id));
      const counts = data.map(entry => entry.chiffreAffaire);
      this.chartByMonth = new Chart('chartByMonth', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Chiffre d\'affaires par Mois',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear', // Assurez-vous que le type d'échelle est correct
              beginAtZero: true
            }
          }
        }
      });
    },
    (error)=>{
      alert(error.error.message);
    });
  }

  loadDate(): void {
    // Détruire le graphique existant avant d'en créer un nouveau
    if (this.chartByDay) {
      this.chartByDay.destroy();
    }

    this.managerApi.byDateChiffreAffaire(this.selectedYearByDate, this.selectedMonth).subscribe((data: any[]) => {
      console.log(data);
      const labels = data.map(entry => entry._id);
      const counts = data.map(entry => entry.chiffreAffaire);
      this.chartByDay = new Chart('chartByDay', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Chiffre d\'affaires par jour',
            data: counts,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear', // Assurez-vous que le type d'échelle est correct
              beginAtZero: true
            }
          }
        }
      });
    },
    (error)=>{
      alert(error.error.message);
    });
  }

  onYearByMonthChange(): void {
    this.loadMonth();
  }

  onYearByDateChange(): void {
    this.loadDate();
  }

  onMonthChange(): void {
    this.loadDate();
  }

  getMonthName(monthString: string): string {
    const [year, month] = monthString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return `${monthNames[monthIndex]} ${year}`;
  }

  logout(): void {
    this.managerApi.logout();
    this.route.navigate(['manager/login']);
  }
}
