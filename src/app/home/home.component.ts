import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../Controllers/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Controllers/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore,
              public auth: AuthService,
              private fb: FormBuilder,
              private user: UserService) {
    this.items = firestore.collection('items').valueChanges();
  }
 loginForm: FormGroup;

 handles = this.user.getUserByUserId(this.auth.user.uid);
 //this.auth.user.subscribe(x=> this.user.getUserByUserId(x.uid))

  ngOnInit(): void {

    this.auth.authCheck();
    this.loginForm = this.fb.group({
      email: ["", Validators.email],
      password: ["", Validators.minLength(8)],
    });
  }

  async authCheck(){
    this.auth.authCheck()
  }

  async login(){
    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  async create(){
    this.auth.signup(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }
   }





