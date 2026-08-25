import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionService } from '../authentification/connection/connection.service';
import { Message } from '../model/message';
import { Type_lavage } from '../model/type_lavage';
import { Utilisateur } from '../model/utilisateur';
import { ServerConfigService } from '../server-config.service';

@Injectable({
  providedIn: 'root'
})
export class TypeLavageService {

  private listType_lavage: Type_lavage[] = []
  private Type_lavage!: Type_lavage;
  dataSource = new MatTableDataSource<Type_lavage>(this.getListType_lavage())
  paginator!: MatPaginator;

  //
  setListType_lavageOnDataSource(s:Type_lavage[]) {
    this.dataSource = new MatTableDataSource<Type_lavage>(s)
    this.dataSource.paginator = this.paginator;
  }
  //

  //get set
  getListType_lavage() {
    return this.listType_lavage
  }
  setListType_lavage(listType_lavage: Type_lavage[]) {
    this.listType_lavage = listType_lavage
  }
  getType_lavage() {
    return this.Type_lavage
  }
  setType_lavage(Type_lavage: Type_lavage) {
    this.Type_lavage = Type_lavage
  }
  //fin get set

  constructor(private http: HttpClient, private conns: ConnectionService, private servP: ServerConfigService) { }


  //requets server
  getAll() {
    return this.http.get<Type_lavage[]>(this.servP.getUrl() + "Type_lavage/getAll", { headers: this.conns.setLocalTokenHeader() })
  }
  getallByDate(date: string) {
    return this.http.post<Type_lavage[]>(this.servP.getUrl() + "Type_lavage/getallByDate", date, { headers: this.conns.setLocalTokenHeader() })
  }
  getAllByUser(user: Utilisateur) {
    return this.http.post<Type_lavage[]>(this.servP.getUrl() + "Type_lavage/getallByUser", user, { headers: this.conns.setLocalTokenHeader() })
  }
  save(type: Type_lavage) {
    return this.http.post<Message>(this.servP.getUrl() + "Type_lavage/save", type, { headers: this.conns.setLocalTokenHeader() })
  }
  remove(type: Type_lavage) {
    return this.http.post<Message>(this.servP.getUrl() + "Type_lavage/delete", type, { headers: this.conns.setLocalTokenHeader() })
  }
  update(id: string, type: Type_lavage) {
    return this.http.post<Message>(this.servP.getUrl() + `Type_lavage/update/${id}`, type, { headers: this.conns.setLocalTokenHeader() })
  }
  getAllWidthAngular() {
    return this.http.get<Type_lavage[]>(this.servP.getUrl() + `Type_lavage/getAllWidthAngular`, { headers: this.conns.getAngularHeader() })
  }
  // fin requets server

  //execution requets server
  getAllType_lavage() {
    this.conns.GlobaleS.initprogresse()
    this.getAll().subscribe(
      (list: Type_lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_lavage = list;
        this.setListType_lavageOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  getAllType_lavageWidthAngular() {
    this.conns.GlobaleS.initprogresse()
    this.getAllWidthAngular().subscribe(
      (list: Type_lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_lavage = list;
        this.setListType_lavageOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  saveType_lavage(Type_lavage: Type_lavage) {
    this.conns.GlobaleS.initprogresse()
    this.save(Type_lavage).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllType_lavage()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }

  updateType_lavage(id: string, Type_lavage: Type_lavage) {
    this.conns.GlobaleS.initprogresse()
    this.update(id, Type_lavage).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllType_lavage()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }

  removeType_lavage(Type_lavage: Type_lavage) {
    let idType_lavage = Type_lavage.id
    if (idType_lavage == "angular") {
      this.conns.GlobaleS.alert("impossible de supprimer angular !!")
    }

    this.conns.GlobaleS.comfirme(
      "ete vous sure de vouloir supprimer ce Type_lavage ?",
      ()=>{
        if (idType_lavage != "angular") {
          this.conns.GlobaleS.initprogresse()
          this.remove(Type_lavage).subscribe(
            (m: Message) => {
              this.conns.GlobaleS.finprogresse()
              this.conns.GlobaleS.alert(m.text)
              this.getAllType_lavage()
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
  getallByDateType_lavage(date: string) {
    this.conns.GlobaleS.initprogresse()
    this.getallByDate(date).subscribe(
      (list: Type_lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_lavage = list;
        this.setListType_lavageOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }
  getAllByUserType_lavage(user: Utilisateur) {
    this.conns.GlobaleS.initprogresse()
    this.getAllByUser(user).subscribe(
      (list: Type_lavage[]) => {
        this.conns.GlobaleS.finprogresse()
        this.listType_lavage = list;
        this.setListType_lavageOnDataSource(list)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }

  //fin execution requets server

}
