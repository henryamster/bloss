import { Component, OnInit, Input } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {

  @Input() collection: Collection;
  boards: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {


  }
  ngOnInit(): void {
    this.boards = this.firestore.collection('Boards', ref => ref.where('parentCategory', '==', this.collection.id)).valueChanges();

  }


}
