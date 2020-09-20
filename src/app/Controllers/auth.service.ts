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
        await this
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


  logout() {
    this.firebaseAuth.signOut();
  }
}
