import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { ConnectionService } from '../authentification/connection/connection.service';
import { Lavage } from '../model/lavage';
import { Message } from '../model/message';
import { Utilisateur } from '../model/utilisateur';
import { ServerConfigService } from '../server-config.service';
import { ListlavageComponent } from './listlavage/listlavage.component';

@Injectable({
  providedIn: 'root'
})
export class LavageService {
  private listLavage: Lavage[] = []
  private listLavageenattente: Lavage[] = []
  private listLavageencoure: Lavage[] = []
  private listLavagefini: Lavage[] = []
  private Lavage!: Lavage;
  listlavageComponent!:ListlavageComponent;
  dataSource = new MatTableDataSource<Lavage>(this.getListLavage())
  paginator!: MatPaginator;

  //
  setListLavageOnDataSource(s: Lavage[]) {
    this.dataSource = new MatTableDataSource<Lavage>(s)
    this.dataSource.paginator = this.paginator;
  }
  //

  //get set
  getListLavage() {
    return this.listLavage
  }

  /*setListLavageEnAttente() {
    let result: Lavage[] = [];
    this.listLavage.forEach(
      lavage => {
        if (this.islavageEnattente(lavage)) {
          result.push(lavage)
        }
      }
    )
    this.listLavageenattente = result;

  }
  setListLavageFini() {
    let result: Lavage[] = [];
    this.listLavage.forEach(
      lavage => {
        if (this.islavagefini(lavage)) {
          result.push(lavage)
        }
      }
    )
    this.listLavagefini = result;
  }
  setListLavageEncoure() {
    let result: Lavage[] = [];
    this.listLavage.forEach(
      lavage => {
        if (this.islavageEncoure(lavage)) {
          result.push(lavage)
        }
      }
    )
    return result;
  }
*/
  getListLavageEncoure() {
    return this.listLavageencoure
  }
  getListLavageEnAttente() {
    return this.listLavageenattente
  }
  getListLavageFini() {
    return this.listLavagefini
  }
  setListLavage(listLavage: Lavage[]) {
    this.listLavage = listLavage
   // this.setListLavageEnAttente()
   // this.setListLavageEncoure()
   // this.setListLavageFini()
    this.listlavageComponent.listelavage=this.getAll().pipe(
      finalize(
        ()=>{
          this.conns.GlobaleS.finprogresse()
        }
      )
     )
  }
  getLavage() {
    return this.Lavage
  }
  setLavage(Lavage: Lavage) {
    this.Lavage = Lavage
  }
  //fin get set

  constructor(private http: HttpClient, private conns: ConnectionService, private servP: ServerConfigService) { }


  //requets server
  getAll() {
    return this.http.get<Lavage[]>(this.servP.getUrl() + "Lavage/getAll", { headers: this.conns.setLocalTokenHeader() })
  }
  getallByDate(date: string) {
    return this.http.post<Lavage[]>(this.servP.getUrl() + "Lavage/getallByDate", date, { headers: this.conns.setLocalTokenHeader() })
  }
  getAllByUser(user: Utilisateur) {
    return this.http.post<Lavage[]>(this.servP.getUrl() + "Lavage/getallByUser", user, { headers: this.conns.setLocalTokenHeader() })
  }
  save(type: Lavage) {
    return this.http.post<Message>(this.servP.getUrl() + "Lavage/save", type, { headers: this.conns.setLocalTokenHeader() })
  }
  remove(type: Lavage) {
    return this.http.post<Message>(this.servP.getUrl() + "Lavage/delete", type, { headers: this.conns.setLocalTokenHeader() })
  }
  update(id: string, type: Lavage) {
    return this.http.post<Message>(this.servP.getUrl() + `Lavage/update/${id}`, type, { headers: this.conns.setLocalTokenHeader() })
  }
  getAllWidthAngular() {
    return this.http.get<Lavage[]>(this.servP.getUrl() + `Lavage/getAllWidthAngular`, { headers: this.conns.getAngularHeader() })
  }
  // fin requets server

  //execution requets server
  getAllLavage() {
    this.conns.GlobaleS.initprogresse()
    this.getAll().subscribe(
      (list: Lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.setListLavage(list)
        this.setListLavageOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  getAllLavageWidthAngular() {
    this.conns.GlobaleS.initprogresse()
    this.getAllWidthAngular().subscribe(
      (list: Lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.setListLavage(list);
        this.setListLavageOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  saveLavage(Lavage: Lavage) {
    this.conns.GlobaleS.initprogresse()
    this.save(Lavage).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllLavage()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }

  finirLavage(Lavage: Lavage) {

    this.conns.GlobaleS.comfirme(
      "cet lavage est il fini !?",
      () => {
        Lavage.heure_fin_lavage = this.conns.GlobaleS.converToInputDate(new Date())
        this.conns.GlobaleS.initprogresse()
        this.save(Lavage).subscribe(
          (m: Message) => {
            this.conns.GlobaleS.finprogresse()
            this.conns.GlobaleS.alert(m.text)
            this.getAllLavage()
          },
          (e: Error) => {
            this.conns.GlobaleS.finprogresse()
            this.conns.GlobaleS.alert("echec " + e.message)
          }
        )
      },
      () => {
       // this.dialog.open(FormmodiflavageComponent)
      }
    )
  }
  retirerLavage(Lavage: Lavage) {

    this.conns.GlobaleS.comfirme(
      "ete vous sure de vouloir arreter ce lavage?",
      () => {
        Lavage.heure_debut_lavage = ''
        this.conns.GlobaleS.initprogresse()
        this.save(Lavage).subscribe(
          (m: Message) => {
            this.conns.GlobaleS.finprogresse()
            this.conns.GlobaleS.alert(m.text)
            this.getAllLavage()
          },
          (e: Error) => {
            this.conns.GlobaleS.finprogresse()
            this.conns.GlobaleS.alert("echec " + e.message)
          }
        )
      },
      () => {
       // this.dialog.open(FormmodiflavageComponent)
      }
    )
  }
  remettreEncoureLavage(Lavage: Lavage) {

    this.conns.GlobaleS.comfirme(
      "remettre dans les taches encoures?",
      () => {
        Lavage.heure_fin_lavage = ''
        this.conns.GlobaleS.initprogresse()
        this.save(Lavage).subscribe(
          (m: Message) => {
            this.conns.GlobaleS.finprogresse()
            this.conns.GlobaleS.alert(m.text)
            this.getAllLavage()
          },
          (e: Error) => {
            this.conns.GlobaleS.finprogresse()
            this.conns.GlobaleS.alert("echec " + e.message)
          }
        )
      },
      () => {
       // this.dialog.open(FormmodiflavageComponent)
      }
    )

  }
  commencerLavage(Lavage: Lavage) {
    if(this.conns.userisOuvrier()){
      Lavage.list_ouvrier.push(this.conns.getCurrentUser())
    }
   if(Lavage.list_ouvrier.length>0){
    Lavage.heure_debut_lavage = this.conns.GlobaleS.converToInputDate(new Date())
    this.conns.GlobaleS.initprogresse()
    this.save(Lavage).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllLavage()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
   }else{
    this.conns.GlobaleS.alert("Echec: aucun ouvrier associer au lavage!")
   }
  }
  updateLavage(id: string, Lavage: Lavage) {
    this.conns.GlobaleS.initprogresse()
    this.update(id, Lavage).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllLavage()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }

  removeLavage(Lavage: Lavage) {
    let idLavage = Lavage.id
    if (idLavage == "angular") {
      this.conns.GlobaleS.alert("impossible de supprimer angular !!")
    }
    this.conns.GlobaleS.comfirme(
      "ete vous sure de vouloir supprimer ce Lavage ?",
      () => {
        if (idLavage != "angular") {
          this.conns.GlobaleS.initprogresse()
          this.remove(Lavage).subscribe(
            (m: Message) => {
              this.conns.GlobaleS.finprogresse()
              this.conns.GlobaleS.alert(m.text)
              this.getAllLavage()
            },
            (e: Error) => {
              this.conns.GlobaleS.finprogresse()
              this.conns.GlobaleS.alert("echec " + e.message)
            }
          )
        }
      }
    )

  }
  getallByDateLavage(date: string) {
    this.conns.GlobaleS.initprogresse()
    this.getallByDate(date).subscribe(
      (list: Lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.setListLavage(list);
        this.setListLavageOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }
  getAllByUserLavage(user: Utilisateur) {
    this.conns.GlobaleS.initprogresse()
    this.getAllByUser(user).subscribe(
      (list: Lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.setListLavage(list);
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  //fin execution requets server

  islavagefini(lavage: Lavage): boolean {
    let result = false;
    if ((lavage.heure_debut_lavage) && (lavage.heure_debut_lavage.length > 0) && (!!lavage.heure_fin_lavage) && lavage.heure_fin_lavage.length > 0) {
      result = true
    }
    return result
  }
  islavageEncoure(lavage: Lavage): boolean {

    let result = false;
    if ((lavage.heure_debut_lavage) && (lavage.heure_debut_lavage.length > 0) && !this.islavagefini(lavage)) {
      result = true
    }
    return result
  }
  islavageEnattente(lavage: Lavage): boolean {
    let result = false;
    if ((!this.islavageEncoure(lavage)) && (!this.islavagefini(lavage))) {
      result = true
    }
    return result
  }
  islavageAujourdhuis(lavage: Lavage): boolean {
    let result = false;
    let date1=lavage.date_lavage;
    let date2=this.conns.GlobaleS.converToInputDate(new Date())
    if (this.conns.GlobaleS.CompareInputDate(date1,date2)==0) {
      result = true
    }
    return result
  }
  islavagePasse(lavage: Lavage): boolean {
    let result = false;
    let date1=lavage.date_lavage;
    let date2=this.conns.GlobaleS.converToInputDate(new Date())
    if (this.conns.GlobaleS.CompareInputDate(date1,date2)==-1) {
      result = true
    }
    return result
  }
  islavageFutur(lavage: Lavage): boolean {
    let result = false;
    let date1=lavage.date_lavage;
    let date2=this.conns.GlobaleS.converToInputDate(new Date())
    if (this.conns.GlobaleS.CompareInputDate(date1,date2)==1) {
      result = true
    }
    return result
  }

  islavageEnregistrerAujourdhuis(lavage: Lavage): boolean {
    let result = false;
    let date1=this.conns.GlobaleS.converToInputDate(lavage.date_enregistrement);
    let date2=this.conns.GlobaleS.converToInputDate(new Date())
    if (this.conns.GlobaleS.CompareInputDate(date1,date2)==0) {
      result = true
    }
    return result
  }
  islavageEnregistrerPasse(lavage: Lavage): boolean {
    let result = false;
    let date1=this.conns.GlobaleS.converToInputDate(lavage.date_enregistrement);
    let date2=this.conns.GlobaleS.converToInputDate(new Date())
    if (this.conns.GlobaleS.CompareInputDate(date1,date2)==-1) {
      result = true
    }
    return result
  }

}
