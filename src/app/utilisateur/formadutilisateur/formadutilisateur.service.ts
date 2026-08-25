import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FichierService } from '../../fichier/fichier.service';
import { Fichier } from '../../model/Fichier';
import { Utilisateur } from '../../model/utilisateur';
import { FormmodifutilisateurComponent } from '../formmodifutilisateur/formmodifutilisateur.component';
import { UtilisateurService } from '../utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class FormadutilisateurService {
  user!:Utilisateur;
  form!:FormGroup;
  formModif!:FormGroup;
  typeOperation:"ajouter"|"modifier"="ajouter";
  asprofile=false;
   file!:File;
   url!:string;

   seturl(){
    this.url=URL.createObjectURL(this.file);
   }
   filechange(e:Event){
     let fileinput=e.target as HTMLInputElement;
     if(fileinput.files&&fileinput.files!=null){
       this.file=fileinput.files[0];
       this.url=URL.createObjectURL(this.file);
       this.asprofile=true
     }else{
      this.asprofile=false;
      this.url="";
     }

   }
  initForm(Utilisateur:Utilisateur){
    this.form=this.fb.group({
      id:[Utilisateur.id,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],name:[Utilisateur.nom,[ Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      lastname:[Utilisateur.prenom,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      email:[Utilisateur.email,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      naissance:["",
        [
          Validators.required
        ]
      ],
       role:["",
       [
         Validators.required
       ]
     ],
     password:["",
      [
        Validators.required
      ]]
     });
     this.typeOperation='ajouter'
     this.url=Utilisateur.picture
     this.asprofile=false;
     }
     readonly dialogue=inject(MatDialog)
  initFormModif(Utilisateur:Utilisateur){
    this.formModif=this.fb.group({
      id:[Utilisateur.id,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      name:[Utilisateur.nom,[ Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      lastname:[Utilisateur.prenom,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      email:[Utilisateur.email,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ],
      naissance:["",
        [
          Validators.required
        ]
      ],
      role:[Utilisateur.role,
        [
          Validators.required
        ]
      ],
      password:["",
      [
        Validators.required
      ]]
     });
     this.typeOperation='modifier'

     this.user=Utilisateur
     this.url=Utilisateur.picture
    // window.alert(this.url)
     this.dialogue.open(FormmodifutilisateurComponent)
     }
  constructor(
    private fb:FormBuilder,
    private ConnectionS:ConnectionService,
    private FichierS:FichierService,
    private UtilisateurS:UtilisateurService
  ) { }

  getUtilisateurFromForm():Utilisateur{
    let Utilisateurf:Utilisateur=new Utilisateur();
    Utilisateurf.id=this.form.value.id;
    Utilisateurf.nom=this.form.value.name;
    Utilisateurf.prenom=this.form.value.lastname;
    Utilisateurf.email=this.form.value.email;
    Utilisateurf.password=this.form.value.password;
    Utilisateurf.role=this.form.value.role;
    return Utilisateurf;
  }


 getUtilisateurFromFormForModif():Utilisateur{
  let Utilisateurf:Utilisateur=this.user;
 // Utilisateurf.id=this.formModif.value.id;
  Utilisateurf.nom=this.formModif.value.name;
  Utilisateurf.prenom=this.formModif.value.lastname;
  Utilisateurf.email=this.formModif.value.email;
  Utilisateurf.password=this.formModif.value.password;
  Utilisateurf.picture=this.user.picture;
  Utilisateurf.role=this.formModif.value.role;

  return Utilisateurf;
 }

 submitUtilisateurForm() {
  let Utilisateur = this.getUtilisateurFromForm()
  if (this.asprofile) {
    this.ConnectionS.GlobaleS.initprogresse()
    let formfichier = this.FichierS.getform(undefined, Utilisateur.id, this.file, 'PROFILE'.toLocaleUpperCase())
    this.FichierS.save(formfichier).subscribe(
      (f: Fichier) => {
        this.ConnectionS.GlobaleS.finprogresse()
        Utilisateur.picture = f.url
        this.UtilisateurS.saveUtilisateur(Utilisateur);
      },
      (e: Error) => {
        this.ConnectionS.GlobaleS.finprogresse()
        if (window.confirm("Nous n'avons pas pu enregistrer le fichier voulez vous continuer ?!")) {
          this.UtilisateurS.saveUtilisateur(Utilisateur);
        }
      }
    );
  } else {
    this.UtilisateurS.saveUtilisateur(Utilisateur);
  }

}
submitUtilisateurFormForModif() {
  let Utilisateur = this.getUtilisateurFromFormForModif()
  if (this.asprofile) {
    let formfichier = this.FichierS.getform(undefined, Utilisateur.id, this.file, 'PROFILE'.toLocaleUpperCase())
    this.ConnectionS.GlobaleS.initprogresse()
    this.FichierS.save(formfichier).subscribe(
      (f: Fichier) => {
        this.ConnectionS.GlobaleS.finprogresse()
        Utilisateur.picture = f.url
        this.UtilisateurS.updateUtilisateur(Utilisateur.id,Utilisateur);
      },
      (e: Error) => {
        this.ConnectionS.GlobaleS.finprogresse()
        if (window.confirm("Nous n'avons pas pu enregistrer le fichier voulez vous continuer ?!")) {
          this.UtilisateurS.saveUtilisateur(Utilisateur);
        }
      }
    );
  } else {
    this.UtilisateurS.updateUtilisateur(Utilisateur.id,Utilisateur);
  }
}


 afficherUtilisateur(){
 // $(".divoperation").toggle();
 }
 fermerUtilisateur(Utilisateur:Utilisateur){
  this.typeOperation="ajouter";
  this.initForm(Utilisateur);
 // $(".divoperation").hide();
 }
}
