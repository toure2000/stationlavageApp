import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Type_voiture } from '../../model/type_voiture';
import { TypeVoitureService } from '../type-voiture.service';
import { FormadtypeVoitureService } from './formadtype-voiture.service';

@Component({
  selector: 'app-formadtype-voiture',
  standalone: true,
  imports: [
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './formadtype-voiture.component.html',
  styleUrl: './formadtype-voiture.component.scss'
})
export class FormadtypeVoitureComponent {
  constructor(
    private observer: BreakpointObserver,
    public FormadtypeVoitureS: FormadtypeVoitureService,
    private TypeVoitureS: TypeVoitureService
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
    voitureinputfile.onchange = (e: Event) => {
      this.FormadtypeVoitureS.filechange(e);
      if(this.FormadtypeVoitureS.file){
        voitureimagefile.src = this.FormadtypeVoitureS.url
      }else{
        voitureimagefile.src = "\assets\icones\picture.jpg"
      }
     }
  }
  //fin codes nessesaires pour gerer les evenent associer à inut image

  //codes nessesaires pour les trois auto complets
  marqueoptions = this.getListMarqueFromTypeVoitureS;
  hauteuroptions = ['1', '0.5', '1.5'];
  longueuroptions = ['2', '2.5', '3'];

  hauteurfilteredOptions!: Observable<string[]>;
  marquefilteredOptions!: Observable<string[]>;
  longueurfilteredOptions!: Observable<string[]>;

  getAsControleOption(value: any) {
    return value as FormControl<string | string>
  }
  initMarqueAutoCompletOption() {
    this.marquefilteredOptions = this.FormadtypeVoitureS.form.controls['marque'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.marqueoptions()) : this.marqueoptions().slice();
      }),
    );
  }
  initHauteurAutoCompletOption() {
    this.hauteurfilteredOptions = this.FormadtypeVoitureS.form.controls['hauteur'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.hauteuroptions) : this.hauteuroptions.slice();
      }),
    );
  }
  initLongueurAutoCompletOption() {
    this.longueurfilteredOptions = this.FormadtypeVoitureS.form.controls['longueur'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.longueuroptions) : this.longueuroptions.slice();
      }),
    );
  }

  initAutoCompletOption() {
    this.initMarqueAutoCompletOption()
    this.initHauteurAutoCompletOption()
    this.initLongueurAutoCompletOption()
  }

  displayFn(string: string): string {
    return string ? string : '';
  }
  private _filter(name: string, options: string[]): string[] {
    const filterValue = name.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getListMarqueFromTypeVoitureS(): string[] {
    let result: string[] = []
    this.TypeVoitureS.getListType_voiture().forEach(
      e => {
        let marque = e.marque;
        if (result.indexOf(marque) < 0) {
          result.push(marque)
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



  ngOnInit() {
    this.TypeVoitureS.getType_voiture()
    this.TypeVoitureS.getListType_voiture()
    //pour formulaire
    this.FormadtypeVoitureS.initForm(new Type_voiture())
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
