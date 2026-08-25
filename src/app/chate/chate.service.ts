import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../authentification/connection/connection.service';
import { Message } from '../model/message';
import { Utilisateur } from '../model/utilisateur';
import { MessageObject } from '../model/websocket/message-object';
import { ServerConfigService } from '../server-config.service';
@Injectable({
  providedIn: 'root'
})
export class ChateService {
  constructor(private http: HttpClient, private servConf: ServerConfigService,private route:Router,
    private observer: BreakpointObserver,
) { }
  getByIdUserFromServer(iduser: string, conns: ConnectionService) {
    return this.http.get<MessageObject[]>(this.servConf.getUrl() + `MessageObject/getByIdUser/${iduser}`, { headers: conns.setLocalTokenHeader() })
  }
  save(p:MessageObject, conns: ConnectionService){
    return this.http.post<MessageObject>(this.servConf.getUrl()+"MessageObject/save",p,{headers:conns.setLocalTokenHeader()})
  }
  getAll(email:string,password:string, conns: ConnectionService){
    return this.http.get<MessageObject[]>(this.servConf.getUrl()+"MessageObject/getAll",{headers:conns.setLocalTokenHeader()})
  }
  remove(id:string,email:string,password:string, conns: ConnectionService){
    return this.http.get<Message>(this.servConf.getUrl()+"MessageObject/remove/"+id,{headers:conns.setLocalTokenHeader()})
  }

  suprimer(id:string, conns: ConnectionService){
    if(window.confirm("Voulez vous vraiment anuler ce MessageObject?!")){
      this.remove(id,"","",conns).subscribe(
        (m:Message)=>{
          window.alert("Le MessageObject à été anullé!!") //m.text
          this.getListMessageOnServer(conns.getCurrentUser().id,conns)
        },
        e=>window.alert("echec!!!")
      )
    }

  }
  enregistrer(p:MessageObject,text:string="le MessageObject a ete enregistrer avec susces !!", conns: ConnectionService){
    this.save(p,conns).subscribe(
      (result:MessageObject)=>{
        window.alert(text);
        this.recupererTous(conns)
      },
      (e)=>{
        window.alert("erreur !!!");
      }
     );
  }

 /* modifier(p:MessageObject){
    this.update(p).subscribe(
      (result:MessageObject)=>{
        window.alert("le MessageObject a ete enregistrer avec susces !!");
        this.recupererTous()
      },
      (e)=>{
        window.alert("erreur !!!");
      }
     );
  }*/
  recupererTous(conns:ConnectionService){
    this.getAll("null","null",conns).subscribe(
      (r:MessageObject[])=>{
       this.setListMessageObject(r);
      },
      e=>window.alert("echec!!!")
   )
  }

  /*preparemodification(p:MessageObject){
    this.newrdv.typeOperation="modifier";
    this.newrdv.setFormFromMessageObjectForModif(p)
    this.newrdv.afficherMessageObject()

  }
   */

  /**scripts d'affichage */
   private isopen=false;
  isandroid:boolean=false

   hide(){
    this.observer.observe(['(max-width: 400px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        history.go(-1)
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
          this.route.navigateByUrl('ListeuserchateComponent')

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
   if(this.isopen==true){
     this.hide()
   }else{
    this.show()
   }
   //sessionStorage.setItem("isopen",this.isopen+'')

  }
  /**fin scripts d'affichage */

  private userTo!: Utilisateur;
  private listUser: Utilisateur[] = []
  private statueChat = false;
  private listIdUserEnCoureDeChate: string[] = []

  getUserTo() {
    let user = new Utilisateur()
    user.nom = "user"
    return this.userTo ? this.userTo : user
  }
  setUserTo(user: Utilisateur) {
    this.userTo = user;
  }
  getListUser() {
    return this.listUser;
  }
  setListUser(list: Utilisateur[]) {
    this.listUser = list
  }
  isConnect() { //si user est connecter au chat
    return this.statueChat;
  }



  ws!: WebSocket
  /*iduser: string = "";
  sessionId: string = "";
  listId: string[] = [];
  listIdTo: string[] = [];
  type:string="message".toUpperCase()
  message: string = "";
  etat:string="non_vue".toUpperCase();
  userfrom!:Utilisateur;
  */
  private listMessage: MessageObject[] = []
  private messageObject: MessageObject = new MessageObject();

  getListMessageObject() {
    return this.listMessage
  }
  setListMessageObject(listmessage: MessageObject[]) {
    this.listMessage = listmessage
  }
  addToListMessageObject(message: MessageObject) {
    if (!this.isMessageInListMessageObject(message.id)) {
      this.listMessage.push(message)
    }
  }
  addToListIdUserEnCoureDeChate(id:string){
     if(!this.isUserEncoureDeMessageAvecMoi(id)){
       this.listIdUserEnCoureDeChate.push(id)
     }
  }
  replaceToListIdUserEnCoureDeChate(value:MessageObject){
    let l:MessageObject[]=[]
    let trouver=false;
    this.getListMessageObject().forEach(
      (elem) => {
        if (value&&value.id&&elem.id == value.id) {
          l.push(value);
          trouver=true;
        }else{
          l.push(elem);
        }
      }
    );
    if(!trouver){
      l.push(value)
    }
    this.setListMessageObject(l);

 }
  removeToListIdUserEnCoureDeChate(id:string){
    this.listIdUserEnCoureDeChate=this.listIdUserEnCoureDeChate.filter((value)=>{return value!=id})
  }
  findMessageByIdInListMessageObject(id: string): MessageObject | undefined {
    let result: MessageObject | undefined = undefined;
    this.getListMessageObject().forEach(
      elem => {
        if (elem.id == id) {
          result = elem;
        }
      }
    );
    return result;
  }
  isMessageInListMessageObject(id: string) {
    let result: boolean = false;
    this.getListMessageObject().forEach(
      elem => {
        if (elem.id == id) {
          result = true;
        }
      }
    );
    return result;
  }
  isUserEncoureDeMessageAvecMoi(id: string) {
    let result: boolean = false;
    this.listIdUserEnCoureDeChate.forEach(
      elem => {
        if (elem == id) {
          result = true;
        }
      }
    );
    return result;
  }

  getUserFrom(): Utilisateur {
    return this.messageObject.user;
  }
  setUserFrom(value: Utilisateur) {
    this.messageObject.user = value

  }
  getIduser(): string {
    return this.messageObject.iduser;
  }
  setIduser(value: string | undefined) {
    if (value != undefined) {
      this.messageObject.iduser = value
    } else {
      window.alert("erreur :iduser is undefined")
    }
  }
  getListMessageOnLocale(iduser: string) {
    let value = sessionStorage.getItem(iduser)
    let result: any = undefined
    if (value) {
      result = JSON.parse(value) as MessageObject[]
    }
    return result;
  }

  getListMessageOnServer(iduser: string, conns: ConnectionService) {
    this.getByIdUserFromServer(iduser, conns).subscribe(
      (result: MessageObject[]) => {
        this.setListMessageObject(result)
        this.setListMessageOnLocale(iduser);
      }
    )
  }


  setListMessageOnLocale(iduser: string) {
    sessionStorage.removeItem(iduser)
    sessionStorage.setItem(iduser, JSON.stringify(this.listMessage))
  }
  getCountListeMessageNonVue(iduseristo: string, iduserEm: string = ""): number {
    let n: number = 0;
    this.listMessage.forEach(
      elem => {
        let elemHaveNoEmeteur: boolean = iduserEm == ""
        let elemHaveEmeteurAndisEmeteurEnter: boolean = elem.iduser == iduserEm
        let useristo: boolean = iduseristo == elem.listIdTo[0]
        let nonvue: boolean =(elem.listIdVue)&& (elem.listIdVue.indexOf(iduseristo)< 0);
        let messageNoteTypeMessageVue=elem.type!="message_vue".toLocaleUpperCase()
        if (nonvue && useristo && (elemHaveEmeteurAndisEmeteurEnter || elemHaveNoEmeteur)&&messageNoteTypeMessageVue) {
          n++;
        }

      }
    )
    return n;
  }
  setMessageUserVueByUser(iduserEm: string, iduserLoc: string, idMessage: string = "ALL") {
    for (let i = 0; i < this.listMessage.length; i++) {

      let message = this.listMessage[i]

      let emeteurValis: boolean = (this.listMessage[i].iduser == iduserEm);
      let recepteurvalide: boolean = (this.listMessage[i].listIdTo[0] == iduserLoc)
      let AllMessageOrSpecifique = (idMessage == message.id) || (idMessage.toLocaleUpperCase() == "ALL")


      if (emeteurValis && recepteurvalide && AllMessageOrSpecifique) {
        //send message vue
        let messagevue: MessageObject = new MessageObject();
        messagevue.type = "MESSAGE_VUE".toUpperCase()
        messagevue.message = message.id
        messagevue.iduser = iduserLoc
        messagevue.listIdTo = [iduserEm]
        console.log(JSON.stringify(messagevue))
        this.sendToGroupChat(messagevue)
      }
    }
  }
  sendMessageEncoureDeChateTo(iduser: string=this.getIduser(), iduserTo: string=this.getListIdTo()[0]){
    let message: MessageObject = new MessageObject();
    message.type = "CHATE_ENCOURE".toUpperCase()
    message.iduser = iduser
    message.listIdTo = [iduserTo]
    console.log(JSON.stringify(message))
    this.sendToGroupChat(message)
  }
  sendMessageFinEncoureDeChateTo(iduser: string=this.getIduser(), iduserTo: string=this.getListIdTo()[0]){
    let message: MessageObject = new MessageObject();
    message.type = "FIN_ENCOURE_CHATE".toUpperCase()
    message.iduser = iduser
    message.listIdTo = [iduserTo]
    console.log(JSON.stringify(message))
    this.sendToGroupChat(message)
  }
  isMessageVueByUserTo(message: MessageObject): boolean {
    return message.listIdVue.indexOf(message.listIdTo[0]) >= 0
  }
  isMessageSendToUserTo(message:MessageObject):boolean{
    let result=false
    result =message.listIdRecue.indexOf(message.listIdTo[0])>=0;
    return result;
 }

  getSessionId(): string {
    return this.messageObject.sessionId
  }
  setSessionId(value: string | undefined) {
    if (value != undefined) {
      this.messageObject.sessionId = value
    } else {
      window.alert("erreur :sessionid is undefined")
    }
  }
  getMessage(): string {
    return this.messageObject.message
  }
  setMessage(value: string | undefined) {
    if (value != undefined) {
      this.messageObject.message = value
    } else {
      window.alert("erreur :message is undefined")
    }
  }
  getType(): string {
    return this.messageObject.message
  }
  setType(value: string) {
    this.messageObject.type = value
  }
  getListId(): string[] {
    return this.messageObject.listId
  }
  setListId(lvalue: string[]) {
    this.messageObject.listId = lvalue
  }
  getListIdTo(): string[] {
    return this.messageObject.listIdTo
  }
  setListIdTo(lvalue: string[]) {
    this.messageObject.listIdTo = lvalue
  }
  inputMessageClick() {
    this.setMessage(this.getInputMessageText());
    this.setType("message".toUpperCase())
    // this.setIduser(this.getNameFromInput());
    this.sendToGroupChat();
  }

  message=new FormControl<string>('');

  getInputMessageText(): string | undefined {
    let messageText = undefined
      messageText = this.message.value!=null?this.message.value:undefined;
      this.message.setValue('')
      return messageText;
  }

  emmetreSonEmition() {
    let music:HTMLAudioElement = new Audio('/assets/audios/emition_message_chate.wav');
    //music.play();
  }
  emmetreSonReception() {
    let music:HTMLAudioElement = new Audio('/assets/audios/reception_message_chate.mp3');
    music.play();

  }

  // On pressing Connect this method will be called
  connect() {
    this.ws = new WebSocket("ws://localhost:8082/chate");

    //This will called everytime new message arrives
    let ws = this.ws;
    let printMessage = this.printMessage
    let sendToGroupChat = this.sendToGroupChat
    let chatS = this
    chatS.statueChat = true
    ws.addEventListener(
      "open", function (e) {
        let exchats = chatS.getListMessageOnLocale(chatS.getIduser());
        if (exchats && chatS.getIduser()) {
          chatS.listMessage = exchats;
          chatS.statueChat = true
        }
        console.log("websocket connecter")
      }
    )
    ws.addEventListener(
      "error", function (e) {
        chatS.statueChat = false
        console.log(JSON.stringify(e))
      }
    )
    ws.addEventListener(
      "close", function (e) {
        chatS.statueChat = false
        console.log(JSON.stringify(e))
      }
    )

    ws.addEventListener(
      "message", function (e) {
        printMessage(e.data, chatS);
      }
    )


    console.log(this.getIduser());

  }

  //This takes care of printing the message on browser
  printMessage(data: any, chatS: ChateService) {
    let messageData = JSON.parse(data) as MessageObject;

    if (messageData.type == "connection_etablie".toUpperCase()) {
      chatS.setSessionId(messageData.sessionId)
      chatS.messageObject.type = "finalisation".toUpperCase()
      chatS.sendToGroupChat()
    } else if (messageData.type == "MESSAGE_VUE".toUpperCase()) {
      console.log(data);
      let list2: MessageObject[] = []
      chatS.getListMessageObject().forEach(
        elem => {
          if (elem.id == messageData.message) {
            elem.listIdVue = messageData.listIdVue
            list2.push(elem);
          } else {
            list2.push(elem);
          }
        }
      )
      console.log(list2)
      chatS.setListMessageObject(list2);
      chatS.setListMessageOnLocale(chatS.getIduser())
    }else if (messageData.type == "CHATE_ENCOURE".toUpperCase()) {
       chatS.addToListIdUserEnCoureDeChate(messageData.iduser)
    }else if (messageData.type == "FIN_ENCOURE_CHATE".toUpperCase()) {
      chatS.removeToListIdUserEnCoureDeChate(messageData.iduser)
    }else if (messageData.type == "ENVOI_REUSSI".toUpperCase()) {
     // window.alert(messageData.message)
      let m0=chatS.findMessageByIdInListMessageObject(messageData.message)
     // let trouver=false;
      if(m0){
        let m=m0;
        let l0=[]
        m.listIdRecue.forEach(
          (e)=>{
            if(e!=messageData.iduser){
              l0.push(e)
            }
          }
        );
        l0.push(messageData.iduser)
        m.listIdRecue=l0;
        chatS.replaceToListIdUserEnCoureDeChate(m)
      }
    }else {

      /*if (messageData.type == "finalisation".toUpperCase()) { //recuperer l'historique des message
        let exchats = chatS.getListMessageOnLocale(chatS.getIduser());
        if (exchats && chatS.getIduser()) {
          chatS.listMessage = exchats;
        }
      }*/

      if (messageData.type == "MESSAGE".toUpperCase()||messageData.type == "MESSAGE_RENDEVOUS".toUpperCase()) {
        console.log(data);
        if (chatS.getIduser() == messageData.listIdTo[0]) { chatS.emmetreSonReception() }
         chatS.replaceToListIdUserEnCoureDeChate(messageData)
         chatS.setListMessageOnLocale(chatS.getIduser()) //mise à jour de l'historique des message
        /*if (newMessage && messages) {
          newMessage.innerHTML = messageData.iduser + " : " + messageData.message;
          messages.appendChild(newMessage);
        }*/
      }

    }

  }

  conditionAffichageMessage(message:MessageObject){
    let chateS=this
    return (message.type=='message'.toLocaleUpperCase()||message.type=='MESSAGE_RENDEVOUS'.toLocaleUpperCase())&&  ((chateS.getUserTo().id!=chateS.getIduser())&& ((message.listIdTo[0]==chateS.getUserTo().id)
    ||(message.iduser==chateS.getUserTo().id))

    ||(chateS.getUserTo().id==chateS.getIduser())&&(message.iduser==chateS.getUserTo().id)&&(message.listIdTo[0]==chateS.getUserTo().id))

  }



  //This handles functionality of sending the message to websocket
  sendToGroupChat(message: MessageObject = this.messageObject) {
    if (this.ws == undefined) return null;
    if (!message.iduser || message.iduser == "") {
      console.log("iduser null ou vide")
    }
    if ((!message.sessionId || message.sessionId == "") && (message.type == "message".toUpperCase()||message.type == "MESSAGE_RENDEVOUS".toUpperCase())) {
      console.log("getSessionId null")
    }
    if (message.iduser && message.iduser != "" && ((message.sessionId && message.sessionId != "") || !(message.type == "message".toUpperCase()||message.type == "MESSAGE_RENDEVOUS".toUpperCase()))) {
      /*let messageObject = {
        iduser: this.iduser,
        sessionId: this.sessionId,
        listId: this.listId,
        message: this.message,
        listIdTo:this.listIdTo,
        type:this.type,
        etat:this.etat,
        user:this.userfrom
      };*/

      if (message.type == "message".toUpperCase()||message.type == "MESSAGE_RENDEVOUS".toUpperCase()) {
        this.emmetreSonEmition()
      }
    }
    //In-Built functions Send is used with object we created
    //message.id=self.crypto.randomUUID();
    this.ws.send(JSON.stringify(message));
    return null
  }




  /*listUserOfListIdChat:Utilisateur[]=[];



  getListIdListMessage():string[]{
    let listids:string[]=[]
    this.listMessage.forEach(
      e=>{
         listids.push(e.iduser)
      }
    )
    return listids;
  }
  getAllUserOfListIdListMessage(){
     this.UtilisateurS.getByListId(this.getListIdListMessage()).subscribe(
      l=>{
        this.listUserOfListIdChat=this.UtilisateurS.normaliseAllImage(l);
      }
    )
  }
*/

}


