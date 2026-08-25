import { Type_voiture } from "./type_voiture";
import { Prix } from "./utile/Prix";

export class Type_lavage {
  id!: string;
  type!: string;
  prix: Prix = new Prix();
  description!: string;
  picture!: string
  duree!: string;
  list_type_voiture: Type_voiture[] = [];
}
