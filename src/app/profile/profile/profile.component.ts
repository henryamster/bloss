import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {environment } from '../../../environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor( private route: ActivatedRoute,
               private firestore: AngularFirestore,
    ) {
      const router = this.route.params.subscribe((x) => {
        this.params = x;
        // this.profileDoc = this.firestore.doc<User>('Users/' + x.url);
        this.profiles = this.firestore.collection('Users', ref => ref.where('url', '==', this.params.userUrl))
        .valueChanges({ idField: 'id' });
      });
     }
     params;
     userUrlBase = environment.url;
     profiles: Observable<any[]>;
     posts: Observable<any[]>;
     comments: Observable<any[]>;


  ngOnInit(): void {

    }

}
