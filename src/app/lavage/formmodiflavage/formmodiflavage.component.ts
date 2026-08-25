import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { map, Observable, startWith } from 'rxjs';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Lavage } from '../../model/lavage';
import { Type_lavage } from '../../model/type_lavage';
import { Type_voiture } from '../../model/type_voiture';
import { Utilisateur } from '../../model/utilisateur';
import { TypeLavageService } from '../../type-lavage/type-lavage.service';
import { TypeVoitureService } from '../../type-voiture/type-voiture.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { User } from '../formadlavage/formadlavage.component';
import { FormadlavageService } from '../formadlavage/formadlavage.service';
import { LavageService } from '../lavage.service';
import { FormmodiflavageService } from './formmodiflavage.service';

@Component({
  selector: 'app-formmodiflavage',
  standalone: true,
  imports: [
    MatTabsModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './formmodiflavage.component.html',
  styleUrl: './formmodiflavage.component.scss'
})
export class FormmodiflavageComponent {
  userisouvrier:boolean=this.ConnectionS.userisOuvrier()
  userisadmin:boolean=this.ConnectionS.userisAdmin()
  userisclient:boolean=this.ConnectionS.userisClient()
  islavagefini=this.lavageS.islavagefini
  islavageEnattente=this.lavageS.islavageEnattente
  islavageEncoure=this.lavageS.islavageEncoure
  remettreEncoureLavage=this.lavageS.remettreEncoureLavage
  finirLavage=this.lavageS.finirLavage
  retirerLavage=this.lavageS.retirerLavage


  constructor(
    private observer: BreakpointObserver,
    public lavageS: LavageService,
    public FormadlavageS: FormadlavageService,
    public TypeLavageS: TypeLavageService,
    public TypeVoitureS: TypeVoitureService,
    public ConnectionS: ConnectionService,
    public UtilisateurS:UtilisateurService,
    private FormmodiflavageS:FormmodiflavageService
  ) { }

  @ViewChild('gridliste')
  matgridlist!: MatGridList;


  //code de slect
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  listTypeLavage = this.TypeLavageS.getAll()
  listTypeVoiture!: Observable<Type_voiture[]>
  SetTypeVoitureAutoCompletOption() {
    let thisx = this;
    function list1() {
      return (thisx.FormadlavageS.formModif.controls['type_lavage'] as FormControl).valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value == undefined) {
             return thisx.TypeVoitureS.getListType_voiture()
          } else {
            let list = (value as Type_lavage).list_type_voiture
            return list;
          }

        })
      );
    }
    this.listTypeVoiture = list1();

  }
  //fin code de slect

  myControl = new FormControl<string | User>('');
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<User[]>;
  listeouvrier: Observable<Utilisateur[]>=this.UtilisateurS.getByRole("OUVRIER")
  listeclient: Observable<Utilisateur[]>=this.UtilisateurS.getByRole("CLIENT")

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  //tab
  @ViewChild('tabgroup', { static: false })
  matTabGroup!: MatTabGroup;
  suivant() {
    this.matTabGroup.selectedIndex = 1;
  }
  //fin tab

  @ViewChild('type_lavage')
  type_lavage!: MatSelect;


  @ViewChild('inputouvrier')
  inputouvrier!: ElementRef;

  @ViewChild('inputclient')
  inputclient!: ElementRef;


  @ViewChild('typeVoiture')
  typeVoiture!: MatSelect;

  @ViewChild('autoouvrier')
  fouvrier!: MatSelect;
  @ViewChild('autoclient')
  fclient!: MatSelect;

  event2() {
    this.ConnectionS.GlobaleS.initprogresse()
    this.listTypeLavage.subscribe(
      l => {
        setTimeout(() => {
          this.ConnectionS.GlobaleS.finprogresse()
          let tlv = this.FormadlavageS.formModif.value.type_lavage as Type_lavage;
         // window.alert(JSON.stringify(tlv))
          this.type_lavage.options.forEach(
            (elem) => {
              if (elem.value && elem.value.id && tlv.id == elem.value.id) {
                elem.select(true)
                 setTimeout(() => {
                  this.typeVoiture.options.forEach(
                    option => {
                      tlv.list_type_voiture.forEach(
                        v2 => {
                          if (option.value && option.value.id && v2.id == option.value.id) {
                            option.select(true)
                          }
                        }
                      )
                    }
                  )
                 }, 100);
              }
            }
          )
        }, 100);
      }
    );
  }

  opSelectOuvrier(){
    let louvrier=(this.FormadlavageS.formModif.value.list_ouvrier as Utilisateur[])
    if(louvrier.length>0){
      let ouv=louvrier[0];
      this.fouvrier.options.forEach(
        op=>{
          if(op.value&&op.value.id&&op.value.id==ouv.id){
            op.select(true);
            let values=ouv.nom +" "+ ouv.prenom;
            (this.inputouvrier.nativeElement as HTMLInputElement).value=values
          }
        }
      )
    }
  }
  opSelectClient(){
    let Client=(this.FormadlavageS.formModif.value.client as Utilisateur)
      this.fclient.options.forEach(
        op=>{
          if(op.value&&op.value.id&&op.value.id==Client.id){
            op.select(true);
            let values=Client.nom +" "+ Client.prenom;
            (this.inputclient.nativeElement as HTMLInputElement).value=values
          }
        }
      )
    }

  ngAfterViewInit() {

    this.UtilisateurS.getByRole("OUVRIER").subscribe(
      l=>{
       setTimeout(() => {
        this.opSelectOuvrier()
       }, 100);
      }
    )
    this.UtilisateurS.getByRole("CLIENT").subscribe(
      l=>{
       setTimeout(() => {
        this.opSelectClient()
       }, 100);
      }
    )

    this.ConnectionS.GlobaleS.initprogresse()
    this.TypeVoitureS.getAll().subscribe(
      l => {
        this.ConnectionS.GlobaleS.finprogresse();
        this.TypeVoitureS.setListType_voiture(l);
        this.SetTypeVoitureAutoCompletOption();
        this.event2()
      }
    )

  }
 // readonly dialoge=inject(MatDialog)
  formIsinitiale=true;
  terminer(){
    let lavage=this.FormadlavageS.getLavageFromFormForModif();
    this.lavageS.commencerLavage(lavage)
  }

  commencerLavage(Lavage:Lavage){
    if(Lavage.list_ouvrier.length==0){
      //this.dialoge.open(FormmodiflavageComponent)
      this.formIsinitiale=false
      this.suivant()
    }else{
       this.lavageS.commencerLavage(this.FormadlavageS.Lavage)
    }
  }

  ngOnInit() {
    this.FormmodiflavageS.formmodiflavageComponent=this;

    if(!(this.FormadlavageS.Lavage&&this.FormadlavageS.Lavage.id)){
      let v=sessionStorage.getItem('lavagecourant');
      let lavagecourant:Lavage;
      if(v){
       lavagecourant=JSON.parse(v) as Lavage
      this.FormadlavageS.initFormModif(lavagecourant);
      }
    }else{
      sessionStorage.setItem('lavagecourant',JSON.stringify(this.FormadlavageS.Lavage))
    }


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    setTimeout(() => {
      this.observer.observe(['(max-width: 400px)']).subscribe((screenSize) => {
        if (screenSize.matches) {
          this.matgridlist.cols = '1'
        } else {
          this.matgridlist.cols = '2';
        }
      });
    }, 100);


  }
   got(n:number){
    history.go(n)
   }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  isforclient():boolean{
    return this.FormadlavageS.Lavage.client&&this.FormadlavageS.Lavage.client.id==this.ConnectionS.getCurrentUser().id
  }
  displayFnOuvrier(){
    let forms=this.FormadlavageS
      return (user:Utilisateur)=>{
       forms.formModif.get('list_ouvrier')?.setValue([user])
       let values=user.nom +" "+ user.prenom
    //   window.alert(JSON.stringify(values))
       return  values
      };
  }
  displayFnClient(){
    let forms=this.FormadlavageS
      return (user:Utilisateur)=>{
       forms.formModif.get('client')?.setValue(user)
       let values=user.nom +" "+ user.prenom
    //   window.alert(JSON.stringify(values))
       return  values
      };
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }



}

