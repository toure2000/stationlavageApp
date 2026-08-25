import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgresseService {

  constructor() { }
  private isopen=false;
  hide(){
   this.isopen=false
 }
 show(){
   this.isopen=true
 }
 isOpen(){
   return this.isopen;
 }
 toggle(){
  this.isopen=!this.isopen
 }
}
