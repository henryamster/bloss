import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Controllers/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService,
    private firestore: AngularFirestore, ) { }
 siteUrl =environment.url;
  handles;
  handlesLoaded:boolean=false;
  ngOnInit(): void {
    this.auth.user.subscribe(x=>{
      this.handles = this.firestore
        .collection('Users', ref => ref.where('userId', '==', x.uid))
        .valueChanges({idField:'id'})
        .subscribe(user=>{
        this.handles=user; 
        this.handlesLoaded = true;
      })
    })
  }
  async logOut(){
    await this.auth.logout();
  }
  

}
