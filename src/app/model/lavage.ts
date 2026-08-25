import { Materiel } from "./Materiel";
import { Services } from "./services";
import { Type_lavage } from "./type_lavage";
import { Type_voiture } from "./type_voiture";
import { Prix } from "./utile/Prix";
import { Utilisateur } from "./utilisateur";

export class Lavage {
  //attributs
  id!: string;
  date_enregistrement!: Date;



  date_lavage!: string;
  heure_debut_lavage!: string;
  heure_fin_lavage!: string;

  date_payement!: Date;
  prix_payer!: Prix;
  //fin attributs

  //mouvement
  typeVoiture: Type_voiture = new Type_voiture();
  enregistreur!: Utilisateur; //personne qui enregistre
  list_ouvrier: Utilisateur[] = [];
  client!: Utilisateur;
  type_lavage: Type_lavage = new Type_lavage();
  list_Service: Services[] = [];
  list_Materiel: Materiel[] = [];
  //fin mouvement


}
