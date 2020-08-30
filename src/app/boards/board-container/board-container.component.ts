import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.css']
})
export class BoardContainerComponent implements OnInit {
  collections: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.collections = firestore.collection('Categories').valueChanges({idField: 'id'});
  }


  ngOnInit(): void {
console.log(this.collections)

  }
}




