import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from './connection.service';
declare var $ :any
@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss'
})
export class ConnectionComponent {
   constructor(private fb:FormBuilder,public connService:ConnectionService,public route:Router){}
   googlelogin(){
    this.connService.connectionAvecGoogle();
   }
   form:FormGroup=this.fb.group({
    username:["",
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]
    ],
    password:["",
    [
      Validators.required
    ]]
   });

   ngSubmit(){
     this.connService.connectionBasic(this.form.value.username,this.form.value.password);
   }
   ngOnInit(){


   }
}
