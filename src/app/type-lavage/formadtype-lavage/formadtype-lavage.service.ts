import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FichierService } from '../../fichier/fichier.service';
import { Fichier } from '../../model/Fichier';
import { Type_lavage } from '../../model/type_lavage';
import { Type_voiture } from '../../model/type_voiture';
import { Prix } from '../../model/utile/Prix';
import { FormmodiftypeLavageComponent } from '../formmodiftype-lavage/formmodiftype-lavage.component';
import { TypeLavageService } from '../type-lavage.service';

@Injectable({
  providedIn: 'root'
})
export class FormadtypeLavageService {

  constructor(
    private fb: FormBuilder,
    private FichierS: FichierService,
    private TypeLavageS: TypeLavageService,
    private ConnectionS: ConnectionService
  ) { }


  Type_lavage!: Type_lavage;
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
  initForm(Type_lavage: Type_lavage) {
    this.form = this.fb.group({
      type: [Type_lavage.type, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ],
      description: [Type_lavage.description,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      prix: [Type_lavage.prix.montant

      ],
      duree: [Type_lavage.duree

      ],
      list_type_voiture: [Type_lavage.list_type_voiture

      ]

    });
    this.typeOperation = 'modifier'
    // this.url=Type_lavage.picture
    this.Type_lavage = Type_lavage
  }

  readonly dialog = inject(MatDialog);
  initFormModif(Type_lavage: Type_lavage) {
    this.formModif = this.fb.group({
      id: [Type_lavage.id,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      type: [Type_lavage.type, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ],
      description: [Type_lavage.description,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      prix: [Type_lavage.prix.montant

      ],
      duree: [Type_lavage.duree

      ] ,
      list_type_voiture: [Type_lavage.list_type_voiture

      ]

    });
    this.typeOperation = 'modifier'
    this.url = Type_lavage.picture
    this.Type_lavage = Type_lavage
    this.dialog.open(FormmodiftypeLavageComponent)
  }

  getType_lavageFromForm(): Type_lavage {
    let Type_lavagef: Type_lavage = new Type_lavage();
    Type_lavagef.type = this.form.value.type;
    Type_lavagef.description = this.form.value.description;
    Type_lavagef.duree = this.form.value.duree;
    Type_lavagef.list_type_voiture=this.form.value.list_type_voiture as Type_voiture[]
    let prix = new Prix()
    prix.montant = Number(this.form.value.prix);
    prix.unite = "DNT"
    Type_lavagef.prix = prix
   // window.alert(JSON.stringify(Type_lavagef.list_type_voiture))
    return Type_lavagef;
  }


  getType_lavageFromFormForModif(): Type_lavage {
    let Type_lavagef: Type_lavage = new Type_lavage();
    Type_lavagef.id = this.formModif.value.id;
    Type_lavagef.type = this.formModif.value.type;
    Type_lavagef.description = this.formModif.value.description;
    Type_lavagef.duree = this.formModif.value.duree;
    Type_lavagef.list_type_voiture = this.formModif.value.list_type_voiture as Type_voiture[]
    let prix = new Prix()
    prix.montant = Number(this.formModif.value.prix);
    prix.unite = "DNT"
    Type_lavagef.prix = prix
    //Type_lavagef.picture = this.url;
    return Type_lavagef;
  }

  submitType_lavageForm() {
    let Type_lavage = this.getType_lavageFromForm()
    if (this.asprofile) {
      this.ConnectionS.GlobaleS.initprogresse()
      let formfichier = this.FichierS.getform(undefined, this.ConnectionS.getCurrentUser().id, this.file, 'Type_lavage'.toLocaleUpperCase())
      this.FichierS.save(formfichier).subscribe(
        (f: Fichier) => {
          this.ConnectionS.GlobaleS.finprogresse()
          Type_lavage.picture = f.url
          this.TypeLavageS.saveType_lavage(Type_lavage);
        },
        (e: Error) => {
          this.ConnectionS.GlobaleS.finprogresse()
          if (window.confirm("Nous n'avons pas pu enregistrer le fichier voulez vous continuer ?!")) {
            this.TypeLavageS.saveType_lavage(Type_lavage);
          }
        }
      );
    } else {
      this.TypeLavageS.saveType_lavage(Type_lavage);
    }

  }
  submitType_lavageFormForModif() {
    let Type_lavage = this.getType_lavageFromFormForModif()
    if (this.asprofile) {
      let formfichier = this.FichierS.getform(undefined, this.ConnectionS.getCurrentUser().id, this.file, 'Type_lavage'.toLocaleUpperCase())
      this.ConnectionS.GlobaleS.initprogresse()
      this.FichierS.save(formfichier).subscribe(
        (f: Fichier) => {
          this.ConnectionS.GlobaleS.finprogresse()
          Type_lavage.picture = f.url
          this.TypeLavageS.saveType_lavage(Type_lavage);
        },
        (e: Error) => {
          this.ConnectionS.GlobaleS.finprogresse()
          if (window.confirm("Nous n'avons pas pu enregistrer le fichier voulez vous continuer ?!")) {
            this.TypeLavageS.saveType_lavage(Type_lavage);
          }
        }
      );
    } else {
      this.TypeLavageS.saveType_lavage(Type_lavage);
    }
  }
}
