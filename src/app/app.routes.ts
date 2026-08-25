import { Routes } from '@angular/router';
import { AccueilleComponent } from './accueille/accueille.component';
import { AccueilleadminComponent } from './accueille/accueilleadmin/accueilleadmin.component';
import { AccueilleclientComponent } from './accueille/accueilleclient/accueilleclient.component';
import { AccueilleouvrierComponent } from './accueille/accueilleouvrier/accueilleouvrier.component';
import { ConnectionComponent } from './authentification/connection/connection.component';
import { RegisterComponent } from './authentification/register/register.component';
import { ChateComponent } from './chate/chate.component';
import { ListchateComponent } from './chate/listchate/listchate.component';
import { ListeuserchateComponent } from './chate/listeuserchate/listeuserchate.component';
import { FichierComponent } from './fichier/fichier.component';
import { ConnectionGoogleSuccesComponent } from './google/connection-google-succes/connection-google-succes.component';
import { isconnecterGuard } from './guards/isconnecter.guard';
import { EditVoitureComponent } from './lavage/edit-voiture/edit-voiture.component';
import { FormadflotantComponent } from './lavage/formadflotant/formadflotant.component';
import { FormmodiflavageComponent } from './lavage/formmodiflavage/formmodiflavage.component';
import { LavageComponent } from './lavage/lavage.component';
import { TypeLavageComponent } from './type-lavage/type-lavage.component';
import { TypeVoitureComponent } from './type-voiture/type-voiture.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

export const routes: Routes = [
 {component:UtilisateurComponent,path:"UtilisateurComponent",canActivate:[isconnecterGuard]},
 {component:LavageComponent,path:"LavageComponent",canActivate:[isconnecterGuard]},
 {component:FormmodiflavageComponent,path:"FormmodiflavageComponent",canActivate:[isconnecterGuard]},
 {component:TypeVoitureComponent,path:"TypeVoitureComponent",canActivate:[isconnecterGuard]},
 {component:FichierComponent,path:"FichierComponent",canActivate:[isconnecterGuard]},
 {component:TypeLavageComponent,path:"TypeLavageComponent",canActivate:[isconnecterGuard]},
 {component:ConnectionComponent,path:"ConnectionComponent"},
 {component:AccueilleadminComponent,path:"AccueilleadminComponent",canActivate:[isconnecterGuard]},
 {component:AccueilleclientComponent,path:"AccueilleclientComponent",canActivate:[isconnecterGuard]},
 {component:AccueilleouvrierComponent,path:"AccueilleouvrierComponent",canActivate:[isconnecterGuard]},
 {component:ConnectionGoogleSuccesComponent,path:"ConnectionGoogleSuccesComponent"},
 {component:RegisterComponent,path:"RegisterComponent"},
 {component:AccueilleComponent,path:"accueille",canActivate:[isconnecterGuard]},
 {component:UtilisateurComponent,path:"UtilisateurComponent",canActivate:[isconnecterGuard]},
 {component:EditVoitureComponent,path:"EditVoitureComponent",canActivate:[isconnecterGuard]},
 {component:FormadflotantComponent,path:"FormadflotantComponent",canActivate:[isconnecterGuard]},
 {component:ChateComponent,path:"ChateComponent",canActivate:[isconnecterGuard]},
 {component:ListeuserchateComponent,path:"ListeuserchateComponent",canActivate:[isconnecterGuard]},
 {component:ListchateComponent,path:"ListchateComponent",canActivate:[isconnecterGuard]},
 {component:ConnectionComponent,path:""}

];
