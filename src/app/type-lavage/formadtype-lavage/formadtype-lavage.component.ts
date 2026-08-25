import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { Type_lavage } from '../../model/type_lavage';
import { TypeVoitureService } from '../../type-voiture/type-voiture.service';
import { TypeLavageService } from '../type-lavage.service';
import { FormadtypeLavageService } from './formadtype-lavage.service';
export interface User {
  name: string;
}
@Component({
  selector: 'app-formadtype-lavage',
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
  ],
  templateUrl: './formadtype-lavage.component.html',
  styleUrl: './formadtype-lavage.component.scss'
})
export class FormadtypeLavageComponent {
  constructor(
    private observer: BreakpointObserver,
    public FormadTypeLavageS: FormadtypeLavageService,
    private TypeLavageS: TypeLavageService,
    private TypeVoitureS:TypeVoitureService
  ) { }

  //codes nessesaires pour gerer les evenent associer à inut image
  @ViewChild('voitureinputfile')
  voitureinputfile!: ElementRef;
  @ViewChild('voitureimagefile')
  voitureimagefile!: ElementRef;
  setEventInputFile() {
    let voitureinputfile = this.voitureinputfile.nativeElement as HTMLInputElement
    let voitureimagefile = this.voitureimagefile.nativeElement as HTMLImageElement
    voitureimagefile.onclick = () => { voitureinputfile.click() }
    voitureinputfile.onchange = (e: Event) => { this.FormadTypeLavageS.filechange(e); voitureimagefile.src = this.FormadTypeLavageS.url }
  }
  //fin codes nessesaires pour gerer les evenent associer à inut image

  //codes nessesaires pour les trois auto complets
  typeoptions = this.getListtypeFromTypeLavageS;
  prixoptions = this.getListPrixFromTypeLavageS;
  dureeoptions = this.getListDureeFromTypeLavageS;

  prixfilteredOptions!: Observable<string[]>;
  typefilteredOptions!: Observable<string[]>;
  dureefilteredOptions!: Observable<string[]>;

  getAsControleOption(value: any) {
    return value as FormControl<string | string>
  }
  inittypeAutoCompletOption() {
    this.typefilteredOptions = this.FormadTypeLavageS.form.controls['type'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.typeoptions()) : this.typeoptions().slice();
      }),
    );
  }
  initprixAutoCompletOption() {
    this.prixfilteredOptions = this.FormadTypeLavageS.form.controls['prix'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.prixoptions()) : this.prixoptions().slice();
      }),
    );
  }
  initdureeAutoCompletOption() {
    this.dureefilteredOptions = this.FormadTypeLavageS.form.controls['duree'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.dureeoptions()) : this.dureeoptions().slice();
      }),
    );
  }

  initAutoCompletOption() {
    this.inittypeAutoCompletOption()
    this.initprixAutoCompletOption()
    this.initdureeAutoCompletOption()
  }

  displayFn(string: string): string {
    return string ? string : '';
  }
  private _filter(name: string, options: string[]): string[] {
    const filterValue = name.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getListtypeFromTypeLavageS(): string[] {
    let result: string[] = []
    this.TypeLavageS.getListType_lavage().forEach(
      e => {
        let type = e.type;
        if (result.indexOf(type) < 0) {
          result.push(type)
        }
      }
    )
    return result;
  }
  getListDureeFromTypeLavageS(): string[] {
    let result: string[] = []
    this.TypeLavageS.getListType_lavage().forEach(
      (e) => {
        let duree = e.duree;
        if (result.indexOf(duree) < 0) {
          result.push(duree)
        }
      }
    )
    return result;
  }
  getListPrixFromTypeLavageS(): string[] {
    let result: string[] = []
    this.TypeLavageS.getListType_lavage().forEach(
      e => {
        let pri = e.prix.montant+'';
        if (result.indexOf(pri) < 0) {
          result.push(pri)
        }
      }
    )
    return result;
  }
  //fin codes nessesaires pour les trois auto complets

  //codes nessesaires pour rendre responsive grid
  @ViewChild('gridliste')
  matgridlist!: MatGridList;

  setGridSystemResponsive() {
    let matgridlist = this.matgridlist
    this.observer.observe(['(max-width: 400px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        matgridlist.cols = '1'
      } else {
        matgridlist.cols = '2';
      }
    });
  }
  //fin codes nessesaires pour rendre responsive grid

  //codes nessesaires pour multi select
  toppingList =this.TypeVoitureS.getAll()
 /* @ViewChild('essay', { static: false })
  matselect!: MatSelect;*/
  //fin codes nessesaires pour multi select

  //tab
  @ViewChild('tabgroup', { static: false })
  matTabGroup!: MatTabGroup;
  suivant(){
    this.matTabGroup.selectedIndex=1;
  }
  //fin tab

  ngOnInit() {
    this.TypeLavageS.getAllType_lavage()
    this.TypeVoitureS.getAllType_voiture()
    //pour formulaire
    this.FormadTypeLavageS.initForm(new Type_lavage())
    this.initAutoCompletOption()
    //fin pour formulaire
    setTimeout(() => {
      this.setGridSystemResponsive()
    }, 500);
  }

  ngAfterViewInit() {
    //pour formulaire
    this.setEventInputFile()
    //fin pour formulaire
  }
}
