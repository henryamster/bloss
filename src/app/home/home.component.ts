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
  constructor(private firestore: AngularFirestore,
              public auth: AuthService,
              private fb: FormBuilder,
              private user: UserService) {
    this.items = firestore.collection('items').valueChanges();
  }
 loginForm: FormGroup;

 handles;
 handlesLoaded=false;
 //this.auth.user.subscribe(x=> this.user.getUserByUserId(x.uid))
loggedIn:boolean=false;;
  ngOnInit(): void {

 
    this.auth.user.subscribe(x=>{
      this.handles = this.firestore
        .collection('Users', ref => ref.where('userId', '==', x.uid))
        .valueChanges({idField:'id'})
        .subscribe(user=>{
        this.handles=user; 
        this.handlesLoaded = true;
        this.loggedIn=true;
      })
    }, ()=>{
      this.loggedIn =false;
    })

    this.loginForm = this.fb.group({
      email: ["", Validators.email],
      password: ["", Validators.minLength(8)],
    });

  //  console.log(this.user.getUserByUserId());
    
  }

  // async authCheck(){
  //   this.auth.authCheck()
  // }

  async login(){
    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  async create(){
    this.auth.signup(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }
   }





