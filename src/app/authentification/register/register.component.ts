import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../../model/message';
import { Utilisateur } from '../../model/utilisateur';
import { ServerConfigService } from '../../server-config.service';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { ConnectionService } from '../connection/connection.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private conns: ConnectionService,
    private userS: UtilisateurService,
    private http:HttpClient,
    private route:Router,
    private serverp:ServerConfigService
  ) { }
  form: FormGroup = this.fb.group(
    {
      id: [
        ""
      ],
      nom: [
        ""
      ],
      prenom: [
        ""
      ],
      email: [
        ""
      ],
      password: [
        ""
      ],
      password2: [
        ""
      ],
    }
  )
  estAdmin() {
    return (this.conns.getCurrentUser() && this.conns.getCurrentUser().role == "ADMIN")
  }
  ngSubmit() {
    let user: Utilisateur = new Utilisateur()
    user.id = this.form.value.id
    user.nom = this.form.value.nom
    user.prenom = this.form.value.prenom
    user.email = this.form.value.email
    user.password = this.form.value.password
    let password2 = this.form.value.password2;
    if (password2 == user.password) {
      this.conns.GlobaleS.alert(JSON.stringify(user))
      if (this.estAdmin()) {
        this.userS.saveUtilisateur(user);
      } else {
        this.conns.GlobaleS.initprogresse()
        this.http.post<Message>(this.serverp.getUrl() + "utilisateur/save", user, { headers: this.conns.getAngularHeader() }).subscribe(
          (resul: Message) => {
            this.conns.GlobaleS.alert(resul.text);
            this.conns.GlobaleS.finprogresse()
            this.route.navigateByUrl("connection")
          },
          (e: Error) => {
            this.conns.GlobaleS.alert(e.message);
            this.conns.GlobaleS.finprogresse()
          }
        )
      }
    } else {

    }
  }
  inscriptionGoogle() {
    this.conns.inscriptionAvecGoogle();
  }
  ngOnInit() {

  }
}
