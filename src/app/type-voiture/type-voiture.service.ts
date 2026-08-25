import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionService } from '../authentification/connection/connection.service';
import { Message } from '../model/message';
import { Type_voiture } from '../model/type_voiture';
import { Utilisateur } from '../model/utilisateur';
import { ServerConfigService } from '../server-config.service';

@Injectable({
  providedIn: 'root'
})
export class TypeVoitureService {

  private listType_voiture: Type_voiture[] = []
  private Type_voiture!: Type_voiture;
  dataSource = new MatTableDataSource<Type_voiture>(this.getListType_voiture())
  paginator!: MatPaginator;

  //
  setListType_voitureOnDataSource(s:Type_voiture[]) {
    this.dataSource = new MatTableDataSource<Type_voiture>(s)
    this.dataSource.paginator = this.paginator;
  }
  //
  //get set
  getListType_voiture() {
    return this.listType_voiture
  }
  setListType_voiture(listType_voiture: Type_voiture[]) {
    this.listType_voiture = listType_voiture
  }
  getType_voiture() {
    return this.Type_voiture
  }
  setType_voiture(Type_voiture: Type_voiture) {
    this.Type_voiture = Type_voiture
  }
  //fin get set

  constructor(private http: HttpClient, private conns: ConnectionService, private servP: ServerConfigService) { }


  //requets server
  getAll() {
    return this.http.get<Type_voiture[]>(this.servP.getUrl() + "Type_voiture/getAll", { headers: this.conns.setLocalTokenHeader() })
  }
  getallByDate(date: string) {
    return this.http.post<Type_voiture[]>(this.servP.getUrl() + "Type_voiture/getallByDate", date, { headers: this.conns.setLocalTokenHeader() })
  }
  getAllByUser(user: Utilisateur) {
    return this.http.post<Type_voiture[]>(this.servP.getUrl() + "Type_voiture/getallByUser", user, { headers: this.conns.setLocalTokenHeader() })
  }
  save(type: Type_voiture) {
    return this.http.post<Message>(this.servP.getUrl() + "Type_voiture/save", type, { headers: this.conns.setLocalTokenHeader() })
  }
  remove(type: Type_voiture) {
    return this.http.post<Message>(this.servP.getUrl() + "Type_voiture/delete", type, { headers: this.conns.setLocalTokenHeader() })
  }
  update(id: string, type: Type_voiture) {
    return this.http.post<Message>(this.servP.getUrl() + `Type_voiture/update/${id}`, type, { headers: this.conns.setLocalTokenHeader() })
  }
  getAllWidthAngular() {
    return this.http.get<Type_voiture[]>(this.servP.getUrl() + `Type_voiture/getAllWidthAngular`, { headers: this.conns.getAngularHeader() })
  }
  // fin requets server

  //execution requets server
  getAllType_voiture() {
    this.conns.GlobaleS.initprogresse()
    this.getAll().subscribe(
      (list: Type_voiture[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_voiture = list;
        this.setListType_voitureOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  getAllType_voitureWidthAngular() {
    this.conns.GlobaleS.initprogresse()
    this.getAllWidthAngular().subscribe(
      (list: Type_voiture[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_voiture = list;
        this.setListType_voitureOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  saveType_voiture(Type_voiture: Type_voiture) {
    this.conns.GlobaleS.initprogresse()
    this.save(Type_voiture).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllType_voiture()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }

  updateType_voiture(id: string, Type_voiture: Type_voiture) {
    this.conns.GlobaleS.initprogresse()
    this.update(id, Type_voiture).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllType_voiture()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }

  removeType_voiture(Type_voiture: Type_voiture) {
    let idType_voiture = Type_voiture.id
    if (idType_voiture == "angular") {
      this.conns.GlobaleS.alert("impossible de supprimer angular !!")
    }
    this.conns.GlobaleS.comfirme("ete vous sure de vouloir supprimer ce Type_voiture ?",
      ()=>{
        if (idType_voiture != "angular" ) {
          this.conns.GlobaleS.initprogresse()
          this.remove(Type_voiture).subscribe(
            (m: Message) => {
              this.conns.GlobaleS.finprogresse()
              this.conns.GlobaleS.alert(m.text)
              this.getAllType_voiture()
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
  getallByDateType_voiture(date: string) {
    this.conns.GlobaleS.initprogresse()
    this.getallByDate(date).subscribe(
      (list: Type_voiture[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_voiture = list;
        this.setListType_voitureOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }
  getAllByUserType_voiture(user: Utilisateur) {
    this.conns.GlobaleS.initprogresse()
    this.getAllByUser(user).subscribe(
      (list: Type_voiture[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_voiture = list;
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  //fin execution requets server

}
