import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { ChateService } from '../../chate/chate.service';
import { MessageObject } from '../../model/websocket/message-object';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
declare var $: any
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  constructor(public conns: ConnectionService, public ChateS: ChateService, public UtilisateurS: UtilisateurService) { }
  getListMessageObject():MessageObject[]{
    return this.ChateS.getListMessageObject()
  }
  @ViewChild('box')
  box!:ElementRef;
  @ViewChild('bell')
  bell!:ElementRef;
  down = false;

  ngAfterViewInit(){
     let divbox=this.box.nativeElement as HTMLElement
     let divbell=this.bell.nativeElement as HTMLElement

     divbell.onclick= (e: Event)=>{
        var color = divbell.textContent;
        if (this.down) {
          divbox.style.display='none'
          divbox.style.height='0px'
          divbox.style.opacity='0'
          this.down = false;

        } else {
          divbox.style.display='block'
          divbox.style.height='auto'
          divbox.style.opacity='1'
          this.down = true;

        }

      }
      divbox.style.display='none'
      divbox.style.height='0px'
      divbox.style.opacity='0'
      this.down = false;

    let surbox=false
    divbox.onmouseenter=()=>{surbox=true}
    divbell.onmouseenter=()=>{surbox=true}
    divbox.onmouseout=()=>{surbox=false}
    divbell.onmouseout=()=>{surbox=false}
    /*document.addEventListener("click", (e:Event)=>{
      let  elem=e.target as HTMLElement
     // alert(elem.className)
      let surboxE= elem.classList.contains("boxElem")||elem.className=="boxElem"
          if(!surboxE){
            $('#box').hide()
            $('#box').css('height', '0px');
            $('#box').css('opacity', '0');
            this.down = false;
          }
    });*/
  }
  ngOnInit() {

  }
}
