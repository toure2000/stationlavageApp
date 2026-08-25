import { Type_voiture } from "./type_voiture";
import { Prix } from "./utile/Prix";

export class Services {
    id!:string;
	nom!:string;
	description!:string;
	prix!:Prix;
	duree!:string;
	list_type_voiture!:Type_voiture[];
}
