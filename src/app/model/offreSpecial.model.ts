import { Service } from "./service.model";

export class OffreSpecial {
  constructor(
    public _id?: string,
    public nom?: string,
    public service?: Service,
    public reduction?: number,
    public dateDebut?: string,
    public dateFin?: string,
  ){  }
}
