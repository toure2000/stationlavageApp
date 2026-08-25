import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Lavage } from '../../model/lavage';
import { Utilisateur } from '../../model/utilisateur';
import { TypeLavageService } from '../../type-lavage/type-lavage.service';
import { TypeVoitureService } from '../../type-voiture/type-voiture.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { FormadlavageService } from '../formadlavage/formadlavage.service';
import { FormmodiflavageService } from '../formmodiflavage/formmodiflavage.service';
import { LavageService } from '../lavage.service';
import { EditVoitureService } from './edit-voiture.service';

@Component({
  selector: 'app-edit-voiture',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './edit-voiture.component.html',
  styleUrl: './edit-voiture.component.scss'
})
export class EditVoitureComponent {
  userisouvrier: boolean = this.ConnectionS.userisOuvrier()
  userisadmin: boolean = this.ConnectionS.userisAdmin()
  userisclient: boolean = this.ConnectionS.userisClient()
  islavagefini = this.lavageS.islavagefini
  islavageEnattente = this.lavageS.islavageEnattente
  islavageEncoure = this.lavageS.islavageEncoure
  remettreEncoureLavage = (lavage:Lavage)=>{this.lavageS.remettreEncoureLavage(lavage)}
  finirLavage = (lavage:Lavage)=>{this.lavageS.finirLavage(lavage)}
  retirerLavage =(lavage:Lavage)=>{this.lavageS.retirerLavage(lavage)}
  removeLavage=(lavage:Lavage)=>{this.lavageS.removeLavage(lavage)}
  formIsinitiale = true;
  terminer() {
    let lavage = this.FormadlavageS.getLavageFromFormForModif();
    this.lavageS.commencerLavage(lavage)
  }
  commencerLavage(Lavage: Lavage) {
    if (Lavage && Lavage.list_ouvrier.length == 0) {
      //this.dialoge.open(FormmodiflavageComponent)
      this.FormadlavageS.initFormModif(Lavage)
      setTimeout(() => {
        this.FormmodiflavageS.setFormIsinitiale(false);
        this.FormmodiflavageS.suivant()
      }, 200);
    } else {
      this.lavageS.commencerLavage(this.FormadlavageS.Lavage)
    }
  }
  isforclient(): boolean {
    return this.FormadlavageS.Lavage.client && this.FormadlavageS.Lavage.client.id == this.ConnectionS.getCurrentUser().id
  }
  isEnregistrerByUser(): boolean {
    return this.FormadlavageS.Lavage.enregistreur && this.FormadlavageS.Lavage.enregistreur.id == this.ConnectionS.getCurrentUser().id
  }

  fermer() {
    this.EditVoitureS.hide()
  }
  public editIsopen = () => { return this.EditVoitureS.isOpen() && this.FormadlavageS.Lavage && this.FormadlavageS.Lavage.id }

  constructor(
    public lavageS: LavageService,
    public FormadlavageS: FormadlavageService,
    public TypeLavageS: TypeLavageService,
    public TypeVoitureS: TypeVoitureService,
    public ConnectionS: ConnectionService,
    public UtilisateurS: UtilisateurService,
    private EditVoitureS: EditVoitureService,
    private FormmodiflavageS: FormmodiflavageService,
    private route:Router


  ) { }



  getImageVoiture(lavage: Lavage) {
    let result = this.ConnectionS.GlobaleS.normaliseImage(lavage.typeVoiture.picture)
      || 'https://www.bmw-tunisia.com/content/dam/bmw/common/all-models/m-series/x7-m60i/2022/navigation/bmw-x-series-x7-m60i-modellfinder.png/jcr:content/renditions/cq5dam.resized.img.585.low.time1649764340453.png'
    return `background-image:url('${result}') ;`
  }
  getImageUser(user: Utilisateur): string {
    let result = this.ConnectionS.GlobaleS.normaliseImage(user.picture)
      || '/assets/icones/user.png';
    return result
  }

  coloretat="#808082"
  getEtat(lavage: Lavage) {
    if (this.lavageS.islavageEnattente(lavage)) {
     this.coloretat="#808082"
      return "en attente".toUpperCase()
    } else if (this.lavageS.islavageEncoure(lavage)) {
      this.coloretat="#7171ce"
      return "en cour".toUpperCase()
    } else if (this.lavageS.islavagefini(lavage)) {
      this.coloretat="#158b2c"
      return "fini".toUpperCase()
    }else{
      return "";
    }
  }
  ngOnInit(){
    if(this.route.url.indexOf('EditVoitureComponent')>=0){
      this.EditVoitureS.setIsOpen(true)
    }
    if(!(this.FormadlavageS.Lavage&&this.FormadlavageS.Lavage.id)){
      let v=sessionStorage.getItem('lavagecourant');
      let lavagecourant:Lavage;
      if(v){
       lavagecourant=JSON.parse(v) as Lavage
       this.FormadlavageS.Lavage=lavagecourant
      }
    }else{
      sessionStorage.setItem('lavagecourant',JSON.stringify(this.FormadlavageS.Lavage))
    }


  }
  ngOnDestroy() {
      this.EditVoitureS.setIsOpen(false)
  }
}
