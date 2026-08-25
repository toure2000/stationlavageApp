import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FichierService } from '../../fichier/fichier.service';
import { Fichier } from '../../model/Fichier';
import { Type_voiture } from '../../model/type_voiture';
import { FormmodiftypeVoitureComponent } from '../formmodiftype-voiture/formmodiftype-voiture.component';
import { TypeVoitureService } from '../type-voiture.service';

@Injectable({
  providedIn: 'root'
})
export class FormadtypeVoitureService {
  constructor(
    private fb: FormBuilder,
    private FichierS: FichierService,
    private TypeVoitureS: TypeVoitureService,
    private ConnectionS: ConnectionService
  ) { }


  Type_voiture!: Type_voiture;
  form!: FormGroup;
  formModif!: FormGroup;
  typeOperation: "ajouter" | "modifier" = "ajouter";
  asprofile = false;
  file!: File;
  url!: string;

  seturl() {
    this.url = URL.createObjectURL(this.file);
  }
  filechange(e: Event) {
    let fileinput = e.target as HTMLInputElement;
    if (fileinput.files && fileinput.files != null) {
      this.file = fileinput.files[0];
      this.url = URL.createObjectURL(this.file);
      this.asprofile = true
    } else {
      this.asprofile = false;
      this.url = "";
    }

  }
  initForm(Type_voiture: Type_voiture) {
    this.form = this.fb.group({
      marque: [Type_voiture.marque, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ],
      description: [Type_voiture.description,
      [
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      hauteur: [Type_voiture.hauteur

      ],
      longueur: [Type_voiture.longueur

      ],

    });
    this.typeOperation = 'modifier'
    this.url = Type_voiture.picture
    this.Type_voiture = Type_voiture
  }



  readonly dialog = inject(MatDialog);
  initFormModif(Type_voiture: Type_voiture) {
    this.formModif = this.fb.group({
      id: [Type_voiture.id,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      marque: [Type_voiture.marque, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ],
      description: [Type_voiture.description,
      [
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      hauteur: [Type_voiture.hauteur,
      [
        Validators.required
      ]
      ],
      longueur: [Type_voiture.longueur,
      [
        Validators.required
      ]
      ],

    });
    //this.typeOperation = 'modifier'
    this.url = Type_voiture.picture
    this.Type_voiture = Type_voiture
    this.dialog.open(FormmodiftypeVoitureComponent);
  }

  getType_voitureFromForm(): Type_voiture {
    let Type_voituref: Type_voiture = new Type_voiture();
    Type_voituref.marque = this.form.value.marque.toUpperCase();
    Type_voituref.description = this.form.value.description;
    Type_voituref.hauteur = this.form.value.hauteur;
    Type_voituref.longueur = this.form.value.longueur;
    return Type_voituref;
  }


  getType_voitureFromFormForModif(): Type_voiture {
    let Type_voituref: Type_voiture = new Type_voiture();
    Type_voituref.id = this.formModif.value.id;
    Type_voituref.marque = this.formModif.value.marque.toUpperCase();
    Type_voituref.description = this.formModif.value.description;
    Type_voituref.hauteur = this.formModif.value.hauteur;
    Type_voituref.longueur = this.formModif.value.longueur;
    Type_voituref.picture = this.url;
    return Type_voituref;
  }

  submitType_voitureForm() {
    let Type_voiture = this.getType_voitureFromForm()
    if (this.asprofile) {
      let formfichier = this.FichierS.getform(undefined, this.ConnectionS.getCurrentUser().id, this.file, 'TYPE_VOITURE')
      this.ConnectionS.GlobaleS.initprogresse()
      this.FichierS.save(formfichier).subscribe(
        (f: Fichier) => {
          this.ConnectionS.GlobaleS.finprogresse()
          Type_voiture.picture = f.url
          this.TypeVoitureS.saveType_voiture(Type_voiture);
        },
        (e: Error) => {
          this.ConnectionS.GlobaleS.finprogresse()
          if (window.confirm("Nous n'avons pas pu enregistrer le fichier voulez vous continuer ?!")) {
            this.TypeVoitureS.saveType_voiture(Type_voiture);
          }
        }
      );
    } else {
      this.TypeVoitureS.saveType_voiture(Type_voiture);
    }

  }
  submitType_voitureFormForModif() {
    let Type_voiture = this.getType_voitureFromFormForModif()
    if (this.asprofile) {
      let formfichier = this.FichierS.getform(undefined, this.ConnectionS.getCurrentUser().id, this.file, 'TYPE_VOITURE')
      this.ConnectionS.GlobaleS.initprogresse()
      this.FichierS.save(formfichier).subscribe(
        (f: Fichier) => {
          this.ConnectionS.GlobaleS.finprogresse()
          Type_voiture.picture = f.url
          this.TypeVoitureS.saveType_voiture(Type_voiture);
        },
        (e: Error) => {
          this.ConnectionS.GlobaleS.finprogresse()
          if (window.confirm("Nous n'avons pas pu enregistrer le fichier voulez vous continuer ?!")) {
            this.TypeVoitureS.saveType_voiture(Type_voiture);
          }
        }
      );
    } else {
      this.TypeVoitureS.saveType_voiture(Type_voiture);
    }
  }

}
