import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditVoitureService {
    constructor(private route:Router,
    private observer: BreakpointObserver,

    ) { }
   private isopen=false;
   private urlancien='LavageComponent';
   hide(){
    this.observer.observe(['(max-width: 400px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.route.navigateByUrl(this.urlancien)
        setTimeout(() => {
          this.isopen=false
       //   sessionStorage.setItem("isopen",this.isopen+'')
        }, 100);
      } else {
          this.isopen=false
        //  sessionStorage.setItem("isopen",this.isopen+'')
      }
    });
  }
  show(){
      this.observer.observe(['(max-width: 400px)']).subscribe((screenSize) => {
        if (screenSize.matches) {
          this.urlancien=this.route.url
          this.route.navigateByUrl('EditVoitureComponent')
          setTimeout(() => {
            this.isopen=true
         //   sessionStorage.setItem("isopen",this.isopen+'')
          }, 100);
        } else {
            this.isopen=true
          //  sessionStorage.setItem("isopen",this.isopen+'')
        }
      });
  }
  isOpen(){
    //this.isopen
    return this.isopen;
  }
  setIsOpen(etat:boolean){
     this.isopen=etat
  }
  toggle(){
   this.isopen=!this.isopen
   //sessionStorage.setItem("isopen",this.isopen+'')

  }


}
