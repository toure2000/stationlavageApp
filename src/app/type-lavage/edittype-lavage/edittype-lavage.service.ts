import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Type_lavage } from '../../model/type_lavage';
import { EdittypeLavageComponent } from './edittype-lavage.component';

@Injectable({
  providedIn: 'root'
})
export class EdittypeLavageService {
  type_lavage:Type_lavage=new Type_lavage();
  constructor() { }
  readonly  dialogee=inject(MatDialog)
  edit(type_lavage:Type_lavage){
    this.type_lavage=type_lavage;
   // window.alert(type_lavage.type)
     this.dialogee.open(EdittypeLavageComponent)
  }
}
