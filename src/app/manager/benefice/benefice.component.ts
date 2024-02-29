import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerApi } from 'src/app/api/manager.api';
import { Chart, registerables } from 'chart.js';

// Enregistrez les modules nécessaires (y compris le contrôleur de bar)
Chart.register(...registerables);

@Component({
  selector: 'app-benefice',
  templateUrl: './benefice.component.html',
  styleUrls: ['./benefice.component.css']
})
export class BeneficeComponent {
  chartByMonth!: Chart;
  currentYear: number;
  selectedYearByMonth: number;

  constructor(private managerApi: ManagerApi, private route: Router) {
    this.currentYear = new Date().getFullYear();
    this.selectedYearByMonth = this.currentYear;
  }

  ngOnInit(): void {
    this.loadMonth();
  }

  ngOnDestroy(): void {
    // Détruire les graphiques lors de la destruction du composant
    if (this.chartByMonth) {
      this.chartByMonth.destroy();
    }
  }

  loadMonth(): void {
    // Détruire le graphique existant avant d'en créer un nouveau
    if (this.chartByMonth) {
      this.chartByMonth.destroy();
    }

    this.managerApi.beneficeByMonth(this.selectedYearByMonth).subscribe((data: any[]) => {
      console.log(data);
      const labels = data.map(entry => this.getMonthName(entry._id));
      const counts = data.map(entry => entry.benefice);
      this.chartByMonth = new Chart('chartByMonth', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Benefices par Mois',
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

  onYearByMonthChange(): void {
    this.loadMonth();
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
