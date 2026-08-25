import { jour } from "./jour";

export class Disponibilite{
  datedebut!:string;
	datefin!:string;
  listejours:jour[]=[new jour("LUNDI"),new jour("MARDI"),new jour("MERCREDI"),new jour("JEUDI"),new jour("VENDREDI"),new jour("SAMEDI")];
	type!:string;
}

