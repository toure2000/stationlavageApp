import { Injectable } from '@angular/core';
import { ServerConfigService } from '../server-config.service';
import { AlertService } from './alert/alert.service';
import { ConfirmationDialogueService } from './confirmation-dialogue/confirmation-dialogue.service';
import { ProgresseService } from './progresse/progresse.service';
@Injectable({
  providedIn: 'root'
})
export class GlobaleService {
  divconteneur!:HTMLElement;

  getStylelaceCentre(width: number, height: number, background: string | undefined) {

    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;
    let divoperationWidth = width <= pageWidth ? width : pageWidth
    let divoperationHeight = height <= pageHeight ? width : pageHeight

    let lef0 = (pageWidth - divoperationWidth) / 2
    let divoperationLeft = lef0 > 0 ? lef0 : 0;

    let top0 = (pageHeight - divoperationHeight) / 2
    let divoperationTop = top0 > 0 ? top0 : 0
    if (background != undefined) {
      return `
     position:fixed;
     height:${divoperationHeight}px;
     width:${divoperationWidth}px;
     left:${divoperationLeft}px;
     top:${divoperationTop}px;
     background-color:${background};
     padding:10px;border-radius:10px;`;
    } else {
      return `
      position:fixed;
      height:${divoperationHeight}px;
      width:${divoperationWidth}px;
      left:${divoperationLeft}px;
      top:${divoperationTop}px;
      padding:10px;border-radius:10px;`;
    }
  }
  clientX = 0
  clientY = 0
  mose(e: MouseEvent) {
    this.clientY = e.clientY
    this.clientX = e.clientX
  }
  setPositionEvent() {
    document.onmousemove = (e: MouseEvent) => {
      this.mose(e)
    };
  }
  getStyleAfficheplace(width: number, height: number) {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;
    let newleft = this.clientX - width / 2;
    newleft = (newleft > (pageWidth - width)) ? pageWidth - width : newleft
    newleft = newleft < 0 ? 0 : newleft

    let newtop = this.clientY;
    newtop = newtop > (pageHeight - height) ? pageHeight - height : newtop
    newtop = newtop < 0 ? 0 : newtop

    this.setPositionEvent()
    return `
      position:fixed;
      height:${height}px;
      width:${width}px;
      left:${newleft}px;
      top:${newtop}px;
      padding:10px;border-radius:10px;`;
  }


  initprogresse() {
    this.ProgresseS.show()
   /* setTimeout(() => {
      this.finprogresse()
    }, 2000);*/
   // $(".onprogresse").show()
  }
  finprogresse() {
    this.ProgresseS.hide()
   // $(".onprogresse").hide()
  }

  haveconfirmation: boolean = false
  textconfirmation=""
  fnconfirmation:any;
  fnconfirmationno:any;

  openconfirmationDialogue(){
    this.ConfirmationDialogueS.show();
  }
  comfirme(text:string,fnok:any,fnno:any=()=>{}){
    this.haveconfirmation=true
    this.textconfirmation=text;
    this.fnconfirmation=fnok;
    this.fnconfirmationno=fnno;
    this.openconfirmationDialogue()
  }
  fermerconfirmation(type:boolean){
    this.haveconfirmation=false
    this.textconfirmation=""
    this.ConfirmationDialogueS.hide()
    if(type){
      this.fnconfirmation()
    }
    if(!type){
      this.fnconfirmationno()
    }
  }

  havealert: boolean = false
  listalertText: string[] = []

  gethaveAllert() {
    return this.havealert && this.listalertText.length > 0;
  }
  fermerAlert() {
    this.havealert = false
    this.listalertText = []
  }
  alert(text: string) {
    this.havealert = true
    this.listalertText.push(text)
    this.havealert=true;
    this.AlertS.show()

  }

  toggleAdminSidBar() {
   // $(".colsidbar").toggleClass('dblock')
  }


  havealertBlock: boolean = false
  listalertTextBlock: string[] = []


  gethaveAllertBlock() {
    return this.havealertBlock && this.listalertTextBlock.length > 0;
  }
  fermerAlertBlock() {
    this.havealertBlock = false
    this.listalertTextBlock = []
    this.havealertBlock=false
  }
  alertBlock(text: string) {
    this.listalertTextBlock.push(text)
    this.havealertBlock = true;
  }

  /*remplaceAllImageNonCharger() {
    var default_avatar = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png';
    window.addEventListener("load", event => {
      setTimeout(
        ()=>{
          document.querySelectorAll('img').forEach(
            (image:HTMLImageElement) => {
              if(image){
              var isLoaded = image.complete && image.naturalHeight !== 0;
              if (!isLoaded) {
                image.src = default_avatar;
              }
            }
            }
          )
        },1000
      )

    });
  }*/

  getimageRemplaceNonCharger(id:string,url:string){
    var default_avatar = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png';
          let image=document.getElementById(id) as HTMLImageElement
          image.onerror=() => {
            var isLoaded = image.complete && image.naturalHeight !== 0;
              if (!isLoaded) {
                image.src = default_avatar;
              }
            }
      return url;
  }

  normaliseImage( url:string):string {
    let pict="";
      if(url!=null) {
      if(url.indexOf("image/")==0) {
        pict=(url.replace("image/", this.servConf.getUrl()+"image/"));
       }
       if(url.indexOf("fichier/")==0) {
         pict=(url.replace("fichier/", this.servConf.getUrl()+"fichier/"));
       }
     }
     return pict;
   }


   /**operations de date */
   converToInputDate(d: Date):string {
    let date = d.toLocaleDateString("fr");
    let j = date.split("/")[0]
    let m = date.split("/")[1]
    let val = date.split("/")[2] + "-" + m + "-" + j
    return val;
  }



   CompareInputDate(date1: string, date2: string) :1|-1|0|undefined{
    let result:1|-1|0|undefined = undefined;
    let ls1 = date1.split("-")
    let ls2 = date2.split("-")
    if (ls1[0] && ls1[1] && ls1[2] && ls2[0] && ls2[1] && ls2[2]) {//integrite


      if (Number(ls1[0]) > Number(ls2[0])) {//date
          result=1;
      } else if (Number(ls1[0]) < Number(ls2[0])) {
         result=-1
      } else {


        if (Number(ls1[1]) > Number(ls2[1])) {  //mois
            result=1
        } else if (Number(ls1[1]) < Number(ls2[1])) {
            result=-1
        } else {


          if (Number(ls1[2]) > Number(ls2[2])) { //jour
            result=1
          } else if (Number(ls1[2]) < Number(ls2[2])) {
             result=-1
          } else {
             result=0;
          }
        }
      }
    }
    return result
  }
/**fin operations de date */
/**operations de time */
   compareHeures(heureminut1:string,heureminut2:string):-1|1|0|undefined{

      let result:-1|1|0|undefined=undefined;
      let heure1=Number(heureminut1.split(":")[0]) ;
      let min1=Number(heureminut1.split(":")[1]) ;

      let heure2=Number(heureminut2.split(":")[0]) ;
      let min2=Number(heureminut2.split(":")[1]) ;
         if(heure1>heure2){
          result=1
         }else{
          if(heure1<heure2){
            result=-1
          }else{
            if(min1>min2){
              result=1
            }else{
              if(min1<min2){
                result=-1
              }else{
                result=0;
              }
            }
          }

      }
      //console.log("comparaison : "+heureminut1+"  "+heureminut2+ " "+result)
      return result;
   }
/**fin operations de time */

  constructor(
    private servConf:ServerConfigService,
    private ConfirmationDialogueS:ConfirmationDialogueService,
    private AlertS:AlertService,
    private ProgresseS:ProgresseService
  ) { }


}
