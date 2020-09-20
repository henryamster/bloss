import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        console.log('Success!', value);
        await this.userService
          .addUser(value.user.uid)
          .then((x) => console.log('User was added succesfully!'))
          .catch((x) => console.log(`There was an exception: ${x}`));
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Nice, it worked!');
        this.router.navigate(['forum']);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  async authCheck() {
    // return this.firebaseAuth.user.subscribe(async (x) => {
    //   const ref = this.firestore
    //     .collection('Users', (ref) => ref.where('userId', '==', x.uid))
    //     .ref.get();
    //   return (await ref).docs.values;
    // });
return this.user.subscribe(async x=>{
  return (await this.firestore.collection('Users', (ref) => ref.where('userId', '==', x.uid)).get()).subscribe(x=>{x.docs.values});
})
   // console.log(this.user)
  }

  async getSignatureById(id: string) {
    const ref = this.firestore.doc<User>('Users/' + id).ref.get();
    return (await ref).get('signature');
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}
