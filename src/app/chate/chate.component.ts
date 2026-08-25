import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../authentification/connection/connection.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { ChateService } from './chate.service';
import { ListchateComponent } from './listchate/listchate.component';
import { ListeuserchateComponent } from './listeuserchate/listeuserchate.component';

@Component({
  selector: 'app-chate',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ListchateComponent, ListeuserchateComponent],
  templateUrl: './chate.component.html',
  styleUrls: ['./chate.component.scss']
})
export class ChateComponent {
  constructor(
    public chateS: ChateService,
    public UtilisateurS: UtilisateurService,
    public conns: ConnectionService,
    private observer: BreakpointObserver,
    private route: Router) { }

  /* inputMessageClickEvent() {
     let thisx=this;
     $("#messagebutton").click(
       () => {
         thisx.chateS.inputMessageClick()
       }
     )
   }
   connectEvent() {
     let thisx=this;
     $("#connectButton").click(
       () => {
         thisx.chateS.connect()
       }
     )
   }
   */





  NsendMessageEncoureDeChateTo = 50;
  sendMessageEncoureDeChateTo() {
    if (this.NsendMessageEncoureDeChateTo > 0) {
      this.chateS.sendMessageEncoureDeChateTo()
      this.NsendMessageEncoureDeChateTo--;
      setTimeout(() => {
        this.sendMessageEncoureDeChateTo()
      }, 100);
    } else {
      this.chateS.sendMessageFinEncoureDeChateTo()
      this.NsendMessageEncoureDeChateTo = 50
    }

  }

  keyentreevent(event: KeyboardEvent) {
    if (event.key.toLocaleUpperCase() == "Enter".toLocaleUpperCase()) {
      this.chateS.inputMessageClick()
    }
  }

  public isopen = () => { return this.chateS.isOpen() }
  fermer() {
    this.chateS.hide()
  }
  ngOnDestroy() {
    this.chateS.setIsOpen(false)
  }
  ngOnInit() {

  }

  isandroid() {
    return this.chateS.isandroid
  }

  desc() {
    var divelistechate = this.divelistechate.nativeElement as HTMLElement;

    divelistechate.scrollTo(0, divelistechate.scrollHeight);
  }

  isenbas=false
  @ViewChild('divelistechate') divelistechate!: ElementRef;
  @ViewChild('applistchate') applistchate!: ListchateComponent;

  scroll(e:Event){
    let div=e.target as HTMLDivElement
  }
  ngAfterViewInit() {

    setTimeout(() => {
     var divelistechate = this.divelistechate.nativeElement as HTMLElement;
      this.isenbas= divelistechate.scrollHeight-divelistechate.scrollTop<400
      divelistechate.onscrollend=()=>{
           this.isenbas= divelistechate.scrollHeight-divelistechate.scrollTop<400
      }
    }, 200);

    if (this.route.url.indexOf('ChateComponent') >= 0) {
      this.chateS.setIsOpen(true)
    }

    this.observer.observe(['(max-width: 400px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.chateS.isandroid = true
      } else {
        this.chateS.isandroid = false
      }
    });
  }
}
