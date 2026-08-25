import { Utilisateur } from "../utilisateur";

export class MessageObject{
  id:string=""
  iduser: string = "";
  sessionId: string = "";
  listId: string[] = [];
  listIdTo: string[] = [];
  listIdRecue:string[]=[];
  type:string="message".toUpperCase()
  message: string = "";
  etat:string="originale".toUpperCase();
  listIdVue:string[]=[];
  user!:Utilisateur;
}
