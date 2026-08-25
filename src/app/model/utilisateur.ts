import { Disponibilite } from "./utile/disponibilite";

export class Utilisateur {
	 tel!:string;
	 password!:string;
	 role:'CLIENT'|'ADMIN'|'OUVRIER'|''='CLIENT';
     picture!:string;
	 constructor(){}
	 id!:string;
	 nom!:string;
	 prenom!:string;
	 email!:string;
	 datecreation:Date=new Date();
	 listedisponibilite:Disponibilite[]=[];
}
