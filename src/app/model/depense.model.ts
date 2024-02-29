import { TypeDepense } from "./typeDepense.model";

export class Depense {
    // [key: string]: string;
    constructor(
      public _id?: string,
      public typedepense?: TypeDepense,
      public mois?:Number,
      public montant?:Number,
      public annee?:Number
    ) {}
}