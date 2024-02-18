// employee.model.ts
export class Employe {
    constructor(
      public _id?: number,
      public nom?: string,
      public prenom?: string,
      public cin?: string,
      public genre?: string,
      public login?: string,
      public mdp?: string,
      public photo?: string
    ) {}
  }

