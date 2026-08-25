import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { Type_voiture } from '../../model/type_voiture';
import { TypeVoitureService } from '../../type-voiture/type-voiture.service';
import { TypeLavageService } from '../type-lavage.service';
import { EdittypeLavageService } from './edittype-lavage.service';

@Component({
  selector: 'app-edittype-lavage',
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
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './edittype-lavage.component.html',
  styleUrl: './edittype-lavage.component.scss'
})
export class EdittypeLavageComponent {
  constructor(
    private observer: BreakpointObserver,
    private TypeLavageS: TypeLavageService,
    private TypeVoitureS:TypeVoitureService,
    private conns:ConnectionService,
    public EdittypeLavageS:EdittypeLavageService
  ) { }
  //codes nessesaires pour gerer les evenent associer à inut image
  @ViewChild('voitureimagefile')
  voitureimagefile!: ElementRef;

  //fin codes nessesaires pour gerer les evenent associer à inut image

  //codes nessesaires pour les trois auto complets


  //fin codes nessesaires pour les trois auto complets

  //codes nessesaires pour rendre responsive grid
  @ViewChild('gridliste')
  matgridlist!: MatGridList;
  listevoiture=this.EdittypeLavageS.type_lavage.list_type_voiture;
  getImageVoiture(tvoiture: Type_voiture) {
    let result = this.conns.GlobaleS.normaliseImage(tvoiture.picture)
      || 'https://www.bmw-tunisia.com/content/dam/bmw/common/all-models/m-series/x7-m60i/2022/navigation/bmw-x-series-x7-m60i-modellfinder.png/jcr:content/renditions/cq5dam.resized.img.585.low.time1649764340453.png'
    return result
  }
  getbg(index:number){
    let list=['#EEE','#DDD','#EEE','#CCC','#BBB']
    return `background-color:${list[index%5]}`;
  }
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
  @ViewChild('matselect')
  matselect!: MatSelect;
  //fin codes nessesaires pour multi select



  ngOnInit() {
    //pour formulaire
    //fin pour formulaire
    setTimeout(() => {
     let im= (this.voitureimagefile.nativeElement as HTMLImageElement)
      im.src=this.conns.GlobaleS.normaliseImage(this.EdittypeLavageS.type_lavage.picture);
      im.onerror=()=>{
        im.src='/assets/icones/picture.jpg'
        im.onerror=null
      }
      this.setGridSystemResponsive()
    }, 500);
  }

  ngAfterViewInit() {

  }
}
