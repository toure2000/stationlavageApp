import { Injectable } from '@angular/core';
import { ListlavageComponent } from './listlavage.component';

@Injectable({
  providedIn: 'root'
})
export class ListlavageService {
  listComp!:ListlavageComponent;
  constructor() { }
  deescendreEnBasDeList(){
    if(this.listComp){
      let elem = this.listComp.mlistlavage.nativeElement as HTMLElement;
      elem.scrollTo(0, 40000)
    }
  }
}
