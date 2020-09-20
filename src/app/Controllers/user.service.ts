import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable, noop, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private firestore: AngularFirestore,
              private router: Router,
              private auth: AuthService) { }

  async getUserNameById(id: string){
    const ref = this.firestore.doc<User>('Users/' + id).ref.get();
    return (await ref).get('handle');
}

  async getUserUrlById(id: string){
    const ref = this.firestore.doc<User>('Users/' + id).ref.get();
    return (await ref).get('url');
  }

  async getAviById(id: string){
    const ref = this.firestore.doc<User>('Users/' + id).ref.get();
    return (await ref).get('avatar');
  }

  async getSignatureById(id: string){
    const ref = this.firestore.doc<User>('Users/' + id).ref.get();
    return (await ref).get('signature');
  }



    getUserByUserId(){
     
    return this.auth.user.subscribe(x=>{
      return this.firestore
        .collection('Users', ref => ref.where('userId', '==', x.uid))
        .valueChanges({idField:'id'})
        .subscribe(user=>{
        return user; 
      })
    })



  }




  

}
