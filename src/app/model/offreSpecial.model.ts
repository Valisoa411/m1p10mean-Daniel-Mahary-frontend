import { Service } from "./service.model";

export class OffreSpecial {
  constructor(
    public _id?: string,
    public nom?: string,
    public service?: Service,
    public reduction?: string,
    public dateDebut?: string,
    public dateFin?: string,
  ){  }
}
