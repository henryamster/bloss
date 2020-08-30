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



}
