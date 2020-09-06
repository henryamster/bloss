import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../Controllers/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore,
              private auth: AuthService,
              private fb: FormBuilder) {
    this.items = firestore.collection('items').valueChanges();
  }
 loginForm;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }



  async login(){
    let userName = this.loginForm
    console.log(this.loginForm)
   // this.auth.login();
  }
   }





