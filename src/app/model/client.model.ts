export class Client {
  // [key: string]: string;

  constructor(
    public _id?: string,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public mdp?: string,
    public genre?: string,
    public dateNaissance?: string,
    public etat?: number,
  ) {}
}
