import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectionService } from '../authentification/connection/connection.service';
import { Message } from '../model/message';
import { Utilisateur } from '../model/utilisateur';
import { ServerConfigService } from '../server-config.service';
//declare var $:any;// ngOninit() seulement !! weehhh !!!
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  constructor(private servConf: ServerConfigService, private http: HttpClient, private conns: ConnectionService) { }
  dataSource = new MatTableDataSource<Utilisateur>(this.getListUtilisateur())
  paginator!: MatPaginator;
  //variables
  private lisUtilisateur: Utilisateur[] = [];
  private Utilisateur!: Utilisateur;
  //script recherche
  public UtilisateurDeRecherche: Utilisateur = new Utilisateur()
  public UtilisateurDeRechercheRole = ""
  //fin variables
  //get set ListUtilisateurs
  getListUtilisateur() {
    return this.lisUtilisateur
  }
  setListUtilisateur(ListUtilisateur: Utilisateur[]) {
    this.lisUtilisateur = ListUtilisateur
  }
  getUtilisateur() {
    return this.Utilisateur
  }
  setUtilisateur(Utilisateur: Utilisateur) {
    this.Utilisateur = Utilisateur
  }
  getUtilisateurDeRecherche() {
    return this.UtilisateurDeRecherche
  }
  setUtilisateurDeRecherche(UtilisateurDeRecherche: Utilisateur) {
    this.UtilisateurDeRecherche = UtilisateurDeRecherche
  }
  getUtilisateurDeRechercheRole() {
    return this.UtilisateurDeRechercheRole
  }
  setUtilisateurDeRechercheRole(UtilisateurDeRechercheRole: string) {
    this.UtilisateurDeRechercheRole = UtilisateurDeRechercheRole
  }
  //fin get set ListUtilisateurs


  //httpclient
  getAll() {
    return this.http.get<Utilisateur[]>(this.servConf.getUrl() + `utilisateur/getAll`, { headers: this.conns.setLocalTokenHeader() })
  }
  get() {
    return this.http.get(this.servConf.getUrl() + `utilisateur/get/{id}`, { headers: this.conns.setLocalTokenHeader() })
  }
  getByEmail() {
    return this.http.get(this.servConf.getUrl() + `utilisateur/getByEmail/{email}`, { headers: this.conns.setLocalTokenHeader() })
  }
  getByRole(role: string) {
    return this.http.get<Utilisateur[]>(this.servConf.getUrl() + `utilisateur/getByRole/${role}`, { headers: this.conns.setLocalTokenHeader() })
  }
  getByIdEmail(idEmail: string) {
    return this.http.get<Utilisateur>(this.servConf.getUrl() + `utilisateur/getByIdEmail/${idEmail}`, { headers: this.conns.setLocalTokenHeader() })
  }
  getByListId(listId: string[]) {
    return this.http.post<Utilisateur[]>(this.servConf.getUrl() + `utilisateur/getByListId`, listId, { headers: this.conns.setLocalTokenHeader() })
  }
  remove(Utilisateur: Utilisateur) {
    return this.http.post<Message>(this.servConf.getUrl() + `utilisateur/removeuser`, Utilisateur, { headers: this.conns.setLocalTokenHeader() })
  }
  removeAll(ids: string) {
    return this.http.get(this.servConf.getUrl() + `utilisateur/removeAll/{ids}`, { headers: this.conns.setLocalTokenHeader() })
  }
  save(Utilisateur: Utilisateur) {
    return this.http.post<Message>(this.servConf.getUrl() + `utilisateur/save`, Utilisateur, { headers: this.conns.setLocalTokenHeader() })
  }
  update(id: string, Utilisateur: Utilisateur) {
    return this.http.put<Message>(this.servConf.getUrl() + `utilisateur/update/${id}`, Utilisateur, { headers: this.conns.setLocalTokenHeader() })
  }
  saveimprofile(form: FormData) {
    return this.http.post<Message>(this.servConf.getUrl() + `utilisateur/saveimprofile`, form, { headers: this.conns.setLocalTokenHeader() })
  }
  sendEmail(email: string, messageHTML: string, subject: string) {
    let message = new Message();
    message.text = email;
    message.text2 = messageHTML;
    message.text3 = subject;
    return this.http.post<Message>(this.servConf.getUrl() + "utilisateur/sendEmail", message, { headers: this.conns.setLocalTokenHeader() });
  }
  //fin httpclient



  //appelles des request httpclient
  sendEmailUtilisateur(email: string, messageHTML: string, subject: string) {
    this.conns.GlobaleS.initprogresse()
    this.sendEmail(email, messageHTML, subject).subscribe(
      (m) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(e.message)
      }
    )
  }

  saveimprofileUtilisateur(form: FormData) {
    this.conns.GlobaleS.initprogresse()
    this.saveimprofile(form).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(e.message)
      }
    )
  }
  saveimprofileUtilisateurIdFile(id: string, file: File) {
    this.conns.GlobaleS.initprogresse()
    let form: FormData = new FormData()
    form.set("file", file)
    form.set("id", id)
    this.saveimprofile(form).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
      },
      (e: Error) => {
        this.conns.GlobaleS.fermerAlert()
        this.conns.GlobaleS.alert(e.message)
      }
    )
  }
  getByRoleUtilisateur() {
    this.conns.GlobaleS.initprogresse()
    this.getAll().subscribe(
      (list: Utilisateur[]) => {
        this.conns.GlobaleS.finprogresse()
        this.lisUtilisateur = this.normaliseAllImage(list);
        this.dataSource = new MatTableDataSource<Utilisateur>(this.getListUtilisateur())
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }
  getAllUtilisateur() {
    this.conns.GlobaleS.initprogresse()
    this.getAll().subscribe(
      (list: Utilisateur[]) => {
        this.conns.GlobaleS.finprogresse()
        this.lisUtilisateur = this.normaliseAllImage(list);
        this.dataSource = new MatTableDataSource<Utilisateur>(this.getListUtilisateur())
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("erro!!" + e.message)
      }
    )
  }
  saveUtilisateur(Utilisateur: Utilisateur) {
    this.conns.GlobaleS.initprogresse()
    this.save(Utilisateur).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllUtilisateur()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }
  saveUtilisateuravecProfile(Utilisateur: Utilisateur, file: File) {
    this.conns.GlobaleS.initprogresse()
    this.save(Utilisateur).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllUtilisateur()
        if (file && file != null) {
          this.conns.GlobaleS.finprogresse()
          this.saveimprofileUtilisateurIdFile(Utilisateur.id, file)
        }
      },
      (e: Error) => {
        this.conns.GlobaleS.alert("echec " + e.message)
        this.conns.GlobaleS.finprogresse()
      }
    )
  }

  removeUtilisateur(Utilisateur: Utilisateur) {

    let idUtilisateur = Utilisateur.id
    if (idUtilisateur == "angular") {
      this.conns.GlobaleS.alert("impossible de supprimer angular !!")
    }
    if (idUtilisateur != "angular") {
      this.conns.GlobaleS.comfirme(
        "ete vous sure de vouloir supprimer ce Utilisateur ?",
        () => {
          this.conns.GlobaleS.initprogresse()
          this.remove(Utilisateur).subscribe(
            (m: Message) => {
              this.conns.GlobaleS.finprogresse()
              this.conns.GlobaleS.alert(m.text)
              this.getAllUtilisateur()
            },
            (e: Error) => {
              this.conns.GlobaleS.finprogresse()
              this.conns.GlobaleS.alert("echec " + e.message)
            }
          )
        }
      )

    }

  }

  updateUtilisateur(id: string, Utilisateur: Utilisateur) {
    this.conns.GlobaleS.initprogresse()
    this.update(id, Utilisateur).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllUtilisateur()
      },
      (e: Error) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert("echec " + e.message)
      }
    )
  }
  updateUtilisateuravecProfile(id: string, Utilisateur: Utilisateur, file: File) {
    this.conns.GlobaleS.initprogresse()
    this.update(id, Utilisateur).subscribe(
      (m: Message) => {
        this.conns.GlobaleS.finprogresse()
        this.conns.GlobaleS.alert(m.text)
        this.getAllUtilisateur()
        if (file && file != null) {
          this.saveimprofileUtilisateurIdFile(Utilisateur.id, file)
        }
      },
      (e: Error) => {
        this.conns.GlobaleS.alert("echec " + e.message)
        this.conns.GlobaleS.finprogresse()
      }
    )
  }


  //fin appelles des request httpclient



  //gestion de l'affichage des components
  hide() {
    this.hideForm()
    this.hideList()
    this.hideFormdisponibiliteUtilisateur()
  }
  show() {
    this.showForm()
    this.showList()
    this.showFormdisponibiliteUtilisateur()
  }
  hideForm() {
    // $("#app-form-utilisateur").hide();
  }
  showForm() {
    // $("#app-form-utilisateur").show();
  }
  hideList() {
    // $("#app-list-utilisateur").hide();
  }
  showList() {
    //$("#app-list-utilisateur").show();
  }
  showFormdisponibiliteUtilisateur() {
    // $("#app-form-disponibilite").show();
  }
  hideFormdisponibiliteUtilisateur() {
    // $("#app-form-disponibilite").hide();
  }
  //fin gestion de l'affichage des components


  //opperations utiles
  normaliseImage(Utilisateur: Utilisateur): Utilisateur {
    if (Utilisateur != null && Utilisateur.picture != null) {
      let pict = Utilisateur.picture;
      if (pict.indexOf("image/") == 0) {
        Utilisateur.picture = (pict.replace("image/", this.servConf.getUrl() + "image/"));
      }
      if (pict.indexOf("fichier/") == 0) {
        Utilisateur.picture = (pict.replace("fichier/", this.servConf.getUrl() + "fichier/"));
      }
    }
    return Utilisateur;
  }
  normaliseAllImage(lUtilisateur: Utilisateur[]): Utilisateur[] {
    let lUtilisateur2: Utilisateur[] = [];
    lUtilisateur.forEach(Utilisateur => {
      lUtilisateur2.push(this.normaliseImage(Utilisateur));
    });
    console.log(lUtilisateur2)
    return lUtilisateur2;
  }
  //fin opperations utiles


  //script recherche

  initUtilisateurDeRecherche() {
    this.UtilisateurDeRecherche = new Utilisateur()
  }
  resultatrecherche: Utilisateur[] = [];

  getHisValue(e: Event) {
    let input = e.target as HTMLInputElement
    if (input) {
      return input.value
    } else {
      return ""
    }
  }
  recherche(UtilisateurDeRecherche: Utilisateur = this.UtilisateurDeRecherche, role = this.UtilisateurDeRechercheRole) {
    let list0: Utilisateur[] = [];
    this.lisUtilisateur.forEach(
      p => {

        let idok = !UtilisateurDeRecherche.id || UtilisateurDeRecherche.id == "" || p.id.indexOf(UtilisateurDeRecherche.id) == 0
        let nomok = !(UtilisateurDeRecherche.nom) || (UtilisateurDeRecherche.nom) == "" || p.nom.indexOf(UtilisateurDeRecherche.nom) >= 0
        let prenomok = !(UtilisateurDeRecherche.prenom) || (UtilisateurDeRecherche.prenom) == "" || p.prenom.indexOf(UtilisateurDeRecherche.prenom) >= 0
        let emailok = !UtilisateurDeRecherche.email || UtilisateurDeRecherche.email == "" || p.email.indexOf(UtilisateurDeRecherche.email) == 0
        let telok = !UtilisateurDeRecherche.tel || UtilisateurDeRecherche.tel == "" || p.id.indexOf(UtilisateurDeRecherche.tel) == 0
        let roleok: boolean = (!role) || (role == "") || (p.role == role)
        let tousok: boolean = idok && nomok && emailok && prenomok && telok && roleok;
        if (tousok) {
          list0.push(p)
        }
      }
    )
    return list0;
  }
  //fin script recherche
}
