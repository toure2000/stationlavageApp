import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Lavage } from '../../model/lavage';
import { Type_lavage } from '../../model/type_lavage';
import { Type_voiture } from '../../model/type_voiture';
import { Utilisateur } from '../../model/utilisateur';
import { TypeLavageService } from '../../type-lavage/type-lavage.service';
import { TypeVoitureService } from '../../type-voiture/type-voiture.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { LavageService } from '../lavage.service';
import { FormadlavageService } from './formadlavage.service';
export interface User {
  name: string;
}

@Component({
  selector: 'app-formadlavage',
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
    CommonModule,
  ],
  templateUrl: './formadlavage.component.html',
  styleUrl: './formadlavage.component.scss'
})
export class FormadlavageComponent {
  constructor(
    private observer: BreakpointObserver,
    public lavageS: LavageService,
    public FormadlavageS: FormadlavageService,
    public TypeLavageS: TypeLavageService,
    public TypeVoitureS: TypeVoitureService,
    public ConnectionS: ConnectionService,
    private UtilisateurS:UtilisateurService
  ) { }

  @ViewChild('gridliste')
  matgridlist!: MatGridList;

  //code de slect
  userisouvrier:boolean=this.ConnectionS.userisOuvrier()
  userisadmin:boolean=this.ConnectionS.userisAdmin()
  userisclient:boolean=this.ConnectionS.userisClient()



  listTypeLavage = this.TypeLavageS.getAll()
  listTypeVoiture!: Observable<Type_voiture[]>
  SetTypeVoitureAutoCompletOption() {
    let thisx = this;
    function list1() {
      return (thisx.FormadlavageS.form.controls['type_lavage'] as FormControl).valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value == undefined) {
            return list2()
          } else {
            let list = (value as Type_lavage).list_type_voiture
            return list;
          }

        })
      );
    }

    function list2() {
      (thisx.FormadlavageS.form.controls['type_lavage'] as FormControl).valueChanges.pipe(
        startWith(''),
        map(value => {
          if (value != undefined) {
            thisx.listTypeVoiture = list1()
          }
        })
      );
      return thisx.TypeVoitureS.getListType_voiture()
    }
    this.listTypeVoiture = list1();

  }
  //fin code de slect

  myControl = new FormControl<string | User>('');
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions!: Observable<User[]>;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  //tab
  @ViewChild('tabgroup', { static: false })
  matTabGroup!: MatTabGroup;
  suivant() {
    this.matTabGroup.selectedIndex = 1;
  }
  //fin tab
  listeouvrier: Observable<Utilisateur[]>=this.UtilisateurS.getByRole("OUVRIER")
  listeclient: Observable<Utilisateur[]>=this.UtilisateurS.getByRole("CLIENT")

  ngOnInit() {
    this.FormadlavageS.initForm(new Lavage())
    this.TypeVoitureS.getAll().subscribe(
      l => {
        this.TypeVoitureS.setListType_voiture(l);
        this.SetTypeVoitureAutoCompletOption();
        setTimeout(() => {
        (this.FormadlavageS.form.controls['type_lavage'] as FormControl).setValue(undefined)
        }, 100);
      }
    )

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

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayFnOuvrier(){
    let forms=this.FormadlavageS
      return (user:Utilisateur)=>{
       forms.form.get('list_ouvrier')?.setValue([user])
       let values=user.nom +" "+ user.prenom
    //   window.alert(JSON.stringify(values))
       return  values
      };
  }
  displayFnClient(){
    let forms=this.FormadlavageS
      return (user:Utilisateur)=>{
       forms.form.get('client')?.setValue(user)
       let values=user.nom +" "+ user.prenom
    //   window.alert(JSON.stringify(values))
       return  values
      };
  }
}
