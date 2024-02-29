export class Service {
  constructor(
    public _id?: string,
    public nom?: string,
    public prix?: number,
    public duree?: number,
    public commission?: number,
    public description?: string,
    public photo?: string,
    public nbEmploye?: number,
    public isPreference?: number,
    public prixFinal?: number,
  ) {
    this.nbEmploye = 1;
  }
}
