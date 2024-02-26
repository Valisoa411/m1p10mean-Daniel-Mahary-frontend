import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeApi } from 'src/app/api/employe.api';
import { TokenService } from 'src/app/client/service/token.service';
import { Employe } from 'src/app/model/employe.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  employee: Employe = new Employe();
  nouvellePhotoFile: File = new File([], '');
  mdptemp="";
  selectedFileName: string = '';
  requiredInput: string[] = [
    'nom',
    'prenom',
    'genre',
    'login',
    'mdp',
    'cin',
  ];
  inputErrors: any = {};
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private employeApi: EmployeApi,
    private renderer: Renderer2
  ) { }

  showPassword: boolean = false;

  // Autres méthodes du composant

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onNouvellePhotoChange(event: any): void {
    this.nouvellePhotoFile = event.target.files[0];
    this.selectedFileName = this.nouvellePhotoFile.name;
  }

  onPhotoUploadClick(): void {
    const fileInput = this.renderer.selectRootElement('#nouvellePhoto');
    this.renderer.setProperty(fileInput, 'value', null);
    fileInput.click();
  }

  ngOnInit(): void {
    // Récupérez l'ID de l'employé à partir du TokenService
    this.employeApi.getEmploye().subscribe(
      (employeeDetails) => {
        // Initialisez l'objet employee avec les détails récupérés
        this.employee = employeeDetails;
      },
      (error) => {
        alert(error.error);
        console.error('Erreur lors de la récupération des détails de l\'employé :', error);
      }
    );
  }

  onPasswordChange() {
    const mdp = this.mdptemp;
    this.inputErrors.mdp = (mdp && mdp.length != 8)
      ? "Le mot de passe doit contenir 8 charactères"
      : null
  }
  onCinChange() {
    const mdp = this.employee.cin;
    
    
    this.inputErrors.cin = (mdp && mdp.toString().length != 8)
      ? "Le cin doit contenir 8 chiffres"
      : null
  }

  isErrorExisting(): boolean {
    return Object.keys(this.inputErrors).some(key => {
      return !!this.inputErrors[key];
    })
  }

  updateEmploye(): void {
    this.employee.mdp=this.mdptemp;
    // ... autres informations à mettre à jour ...
    if(!this.isErrorExisting()){
      if (this.nouvellePhotoFile) {
        this.employeApi.updateEmployeWithPic(this.employee, this.nouvellePhotoFile).subscribe((data) => {
          console.log('Employé mis à jour avec succès :', data);
        });
      } else {
        this.employeApi.updateEmploye(this.employee).subscribe((data) => {
          console.log('Employé mis à jour avec succès :', data);
        });
      }
    }
  
    this.router.navigate(['employe/signin']);
  }
  logout():void{
    this.employeApi.logout();
    this.router.navigate(['employe/signin']);
  }
}
