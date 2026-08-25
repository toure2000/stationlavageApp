import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../../authentification/connection/connection.service';
import { FichierService } from '../../fichier/fichier.service';
import { Lavage } from '../../model/lavage';
import { LavageComponent } from '../lavage.component';
import { LavageService } from '../lavage.service';

@Injectable({
  providedIn: 'root'
})
export class FormadlavageService {


  constructor(
    private fb: FormBuilder,
    private FichierS: FichierService,
    private LavageS: LavageService,
    private ConnectionS: ConnectionService,
    private route:Router
  ) { }


  Lavage!: Lavage;
  form!: FormGroup;
  formModif!: FormGroup;
  typeOperation: "ajouter" | "modifier" = "ajouter";
  asprofile = false;
  file!: File;
  url!: string;
  lavageComponent!:LavageComponent
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
  initForm(Lavage: Lavage) {
    this.form = this.fb.group({
      type_lavage: [Lavage.type_lavage, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ],
      typeVoiture: [Lavage.typeVoiture,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      list_Service: [Lavage.list_Service

      ],
      list_ouvrier: [Lavage.list_ouvrier

      ],
      list_Materiel: [Lavage.list_Materiel

      ],
      client: [Lavage.client

      ]

    });
    this.typeOperation = 'ajouter'
    // this.url=Lavage.picture
    this.Lavage = Lavage
  }

  initFormModif(Lavage: Lavage) {
    this.formModif = this.fb.group({
      id: [Lavage.id,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      type_lavage: [Lavage.type_lavage, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]
      ],
      typeVoiture: [Lavage.typeVoiture,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
      ],
      list_Service: [Lavage.list_Service

      ],
      list_ouvrier: [Lavage.list_ouvrier

      ],
      list_Materiel: [Lavage.list_Materiel

      ],
      client: [Lavage.client

      ]
    });
    this.typeOperation = 'modifier'
    // this.url = Lavage.picture
    this.Lavage = Lavage
    this.route.navigateByUrl('FormmodiflavageComponent')

  }


  getLavageFromForm(): Lavage {
    let Lavagef: Lavage = new Lavage();
    Lavagef.type_lavage = this.form.value.type_lavage;
    Lavagef.typeVoiture = this.form.value.typeVoiture;
    Lavagef.list_Service = this.form.value.list_Service;
    Lavagef.list_Materiel=this.form.value.list_Materiel
    Lavagef.list_ouvrier=this.form.value.list_ouvrier

   // window.alert(JSON.stringify(Lavagef.list_type_voiture))
    return Lavagef;
  }


  getLavageFromFormForModif(): Lavage {
    let Lavagef: Lavage = this.Lavage;
    Lavagef.id = this.formModif.value.id;
    Lavagef.type_lavage = this.formModif.value.type_lavage;
    Lavagef.typeVoiture = this.formModif.value.typeVoiture;
    Lavagef.list_Service = this.formModif.value.list_Service;
    Lavagef.list_Materiel=this.formModif.value.list_Materiel
    Lavagef.list_ouvrier=this.formModif.value.list_ouvrier
    Lavagef.client=this.formModif.value.client

   /* Lavagef.date_enregistrement=this.Lavage.date_enregistrement
    Lavagef.heure_debut_lavage=this.Lavage.heure_debut_lavage
    Lavagef.heure_fin_lavage=this.Lavage.heure_fin_lavage
    Lavagef.enregistreur=this.Lavage.enregistreur*/


    //Lavagef.picture = this.url;
    return Lavagef;
  }

  submitLavageForm() {
    let Lavage = this.getLavageFromForm()
    Lavage.enregistreur=this.ConnectionS.getCurrentUser()
    if(this.ConnectionS.userisClient()){
      Lavage.client=this.ConnectionS.getCurrentUser();
    }
    this.LavageS.saveLavage(Lavage);

  }
  submitLavageFormForModif() {
    let Lavage = this.getLavageFromFormForModif()
    Lavage.enregistreur=this.ConnectionS.getCurrentUser()
    this.LavageS.saveLavage(Lavage);
  }

}
