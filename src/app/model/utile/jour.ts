
export class jour{
  constructor(nomj:"LUNDI"|"MARDI"|"MERCREDI"|"JEUDI"|"VENDREDI"|"SAMEDI"|undefined=undefined,
             heured:string|undefined=undefined,heuref:string|undefined=undefined
  ){
    if(nomj!=undefined){
      this.nomjour=nomj;
    }
    if(heured!=undefined){
      this.heuredebut=heured
    }else{
      this.heuredebut="08:00"
    }
    if(heuref!=undefined){
      this.heurefin=heuref
    }else{
      this.heurefin="18:00"
    }
  }
  get(nomj:"LUNDI"|"MARDI"|"MERCREDI"|"JEUDI"|"VENDREDI"|"SAMEDI"|undefined=undefined,
   heured:string|undefined=undefined,heuref:string|undefined=undefined){
     let j=new jour()
    if(nomj!=undefined){
      j.nomjour=nomj;
    }
    if(heured!=undefined){
      j.heuredebut=heured
    }
    if(heuref!=undefined){
      j.heurefin=heuref
    }
    return j
  }
  nomjour:"LUNDI"|"MARDI"|"MERCREDI"|"JEUDI"|"VENDREDI"|"SAMEDI"="LUNDI";
	heuredebut!:string;
	heurefin!:string;
}
