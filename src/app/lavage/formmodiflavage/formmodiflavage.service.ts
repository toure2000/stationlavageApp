import { Injectable } from '@angular/core';
import { FormmodiflavageComponent } from './formmodiflavage.component';

@Injectable({
  providedIn: 'root'
})
export class FormmodiflavageService {

  constructor() { }
  formmodiflavageComponent!:FormmodiflavageComponent
  setFormIsinitiale(value:boolean){
    this.formmodiflavageComponent.formIsinitiale=value
  }
  suivant(){
    this.formmodiflavageComponent.suivant()
  }
}
