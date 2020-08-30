import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }
  params;
  isCategoryView = false;
  collections: Observable<any[]>;
  boards: Observable<any[]>;
  ngOnInit(): void {


/**
 * @todo This section deals with navigation to a Category, instead of having a separate view to encapsulate this logic.
 * This may need to be extracted to that component in the future.
 */
    const route = this.route.params.subscribe(x => {this.params = x;

      // Check that there is a board in the route
                                                    if (!x.board) {
        this.isCategoryView = true;
        // Gather one category that matches routename
        this.collections = this.firestore.collection('Categories',
    ref => ref.where( 'Name', '==', this.params.category))
    .valueChanges({idField: 'id'});
        console.log([this.collections, this.params.category]);
      }

      else{
        this.boards = this.firestore.collection('Boards',
        ref => ref.where( 'Name', '==', this.params.board))
        .valueChanges({idField: 'id'});
      }

    })





  }

}
