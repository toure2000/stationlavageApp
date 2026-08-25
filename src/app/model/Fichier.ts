import { Utilisateur } from "./utilisateur";

export class Fichier {
  id!: string;
  type!: "IDENTITY" |"VOITURE" |"TYPE_LAVAGE" | "TYPE_VOITURE" | "PROFILE"|"PASSPORT";
  url!: string;
  personne!: Utilisateur;
}

