import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable, noop } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

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

  async addUser(uid){
    const emptyUserProfile = new User();
    emptyUserProfile.userId = uid;
    const ref = this.firestore.collection('Users').add(emptyUserProfile)
    .then(x =>
      console.log('Successfully create user profile')
    ).catch (x=>
    console.log(`There was an error: ${x}`)
    );
  }
}
