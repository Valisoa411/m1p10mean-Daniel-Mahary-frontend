import { Client } from "./client.model";
import { Employe } from "./employe.model";
import { Service } from "./service.model";

export class RendezVous {
  constructor(
    public _id?: string,
    public client?: Client,
    public service?: Service,
    public date?: string,
    public employes?: Employe[],
    public prixFinal?: number,
    public etat?: string,
  ) {}
}
