export class Service {
  // [key: string]: string;

  constructor(
    public _id?: string,
    public nom?: string,
    public prix?: number,
    public duree?: number,
    public commission?: number,
    public description?: string,
    public photo?: string,
    public nbEmploye?: number,
  ) {
    this.nbEmploye = 1;
  }
}
