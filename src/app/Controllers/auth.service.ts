import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(firestore: AngularFirestore) { }

  signIn(){

  }
}
