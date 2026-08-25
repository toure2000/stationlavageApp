import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Lavage } from '../../model/lavage';
import { Utilisateur } from '../../model/utilisateur';
import { EditVoitureComponent } from '../edit-voiture/edit-voiture.component';
import { EditVoitureService } from '../edit-voiture/edit-voiture.service';
import { FormadflotantComponent } from '../formadflotant/formadflotant.component';
import { FormadflotantService } from '../formadflotant/formadflotant.service';
import { FormadlavageService } from '../formadlavage/formadlavage.service';
import { LavageService } from '../lavage.service';
import { ListlavageService } from './listlavage.service';
@Component({
  selector: 'app-listlavage',
  standalone: true,
  imports: [
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    AsyncPipe,
    CommonModule,
    EditVoitureComponent,
    FormadflotantComponent
  ],
  templateUrl: './listlavage.component.html',
  styleUrl: './listlavage.component.scss'
})
export class ListlavageComponent {
  /*@ViewChild('gridliste')
  matgridlist!: MatGridList;*/

  @ViewChild('liste1')
  liste1!: ElementRef;

  @ViewChild('liste2')
  liste2!: ElementRef;

  @ViewChild('liste3')
  liste3!: ElementRef;


  userisouvrier:boolean=this.conns.userisOuvrier()
  userisadmin:boolean=this.conns.userisAdmin()
  userisclient:boolean=this.conns.userisClient()
  islavagefini=this.LavageS.islavagefini
  islavageEnattente=this.LavageS.islavageEnattente
  islavageEncoure=this.LavageS.islavageEncoure
  remettreEncoureLavage=this.LavageS.remettreEncoureLavage
  finirLavage=this.LavageS.finirLavage
  retirerLavage=this.LavageS.retirerLavage
  removeLavage=this.LavageS.retirerLavage
  getListLavage=()=>{return this.LavageS.getListLavage()}


  matlistitemStyle(lavage:Lavage|undefined){
    let result="height:80px;";
    if(lavage&&lavage.client&&lavage.client.id==this.conns.getCurrentUser().id){
      result=result+"background-color: rgb(159, 192, 127);"
    }
    return result;
  }

  listelavage!: Observable<Lavage[]>;

  constructor(
    public LavageS: LavageService,
    public conns: ConnectionService,
    public FormadlavageS: FormadlavageService,
    private ListlavageS:ListlavageService,
    private EditVoitureS:EditVoitureService,
    private FormadflotantS:FormadflotantService
  ) { }
  getImageVoiture(lavage: Lavage) {
    let result = this.conns.GlobaleS.normaliseImage(lavage.typeVoiture.picture)
      || 'https://www.bmw-tunisia.com/content/dam/bmw/common/all-models/m-series/x7-m60i/2022/navigation/bmw-x-series-x7-m60i-modellfinder.png/jcr:content/renditions/cq5dam.resized.img.585.low.time1649764340453.png'
    return `background-image:url('${result}') ;`
  }
  getImageUser(user: Utilisateur):string {
    let result = this.conns.GlobaleS.normaliseImage(user.picture)
      || '/assets/icones/user.png';
    return result
  }

  @ViewChild('mlistlavage')
  mlistlavage!: ElementRef;

  afficherFormFlotant(){
    this.FormadflotantS.show()
  }
  editLavage(lavage:Lavage){
     this.FormadlavageS.Lavage=lavage;
     this.EditVoitureS.show()
    /// window.alert(this.EditVoitureS.isOpen())
  }
  ngOnInit() {
    this.LavageS.listlavageComponent=this
     this.LavageS.getAllLavage()
     this.ListlavageS.listComp=this;
    //this.listelavage = this.LavageS.getAll()


  }


  ngAfterViewInit(){
    let divliste1=this.liste1.nativeElement as HTMLElement
      let divliste2=this.liste2.nativeElement as HTMLElement
      let divliste3=this.liste3.nativeElement as HTMLElement



  }
}
