import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable, noop, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private firestore: AngularFirestore,
              private router: Router) { }

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

  async getUserByUserId(id: string){
    // const ref = this.firestore.doc<User>('Users/' + id).ref.get();
    // return (await ref).get('userId');
const ref = this.firestore.collection('Users', ref=> ref.where('userId', '==', id));
return await ref.valueChanges({'idFielf': id});

    // const ref = await this.firestore.collection('Users', ref => ref.where('userId', '==', id)).valueChanges({idField: "id"});

    // return  (await ref).;
  }




  async addUser(uid: string){
    const emptyUserProfile = {
      userId: uid
    };
    const ref = await this.firestore.collection('Users').add(emptyUserProfile)
    .then(x => {
      console.log('Successfully create user profile');
      this.router.navigate(['firstVisit']);
    }).catch (x =>
    console.log(`There was an error: ${x}`)
    );
  }

}
