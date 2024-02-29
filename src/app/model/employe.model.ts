// employee.model.ts
export class Employe {
    constructor(
      public _id?: string,
      public nom?: string,
      public prenom?: string,
      public cin?: string,
      public genre?: string,
      public login?: string,
      public mdp?: string,
      public photo?: string,
      public matricule?: string,
      public isPreference?: number,
    ) {}
  }

