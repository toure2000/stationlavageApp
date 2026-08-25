import { Component } from '@angular/core';
import { ConnectionService } from '../authentification/connection/connection.service';
import { ListlavageComponent } from './listlavage/listlavage.component';

@Component({
  selector: 'app-lavage',
  standalone: true,
  imports: [ListlavageComponent],
  templateUrl: './lavage.component.html',
  styleUrl: './lavage.component.scss'
})
export class LavageComponent {
  constructor(private conns:ConnectionService){}
   ngOnInit(){

   }
   ngAfterViewInit(){
     setTimeout(() => {
      let scrolltop=sessionStorage.getItem("divconteneurscrolltop");
      if(scrolltop){
       this.conns.GlobaleS.divconteneur.scrollTo(0,Number(scrolltop))
      }
     }, 200);
  }

   ngOnDestroy() {
   // window.alert(this.conns.GlobaleS.divconteneur.scrollTop)
    sessionStorage.setItem("divconteneurscrolltop",this.conns.GlobaleS.divconteneur.scrollTop+'')
  }
}
