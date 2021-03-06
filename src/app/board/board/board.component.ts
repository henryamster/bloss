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
  topics: Observable<any[]>;
  loading = true;
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
    ref => ref.where( 'name', '==', this.params.category))
    .valueChanges({idField: 'id'});
        this.loading = false;
      }

      else{
        this.boards = this.firestore.collection('Boards',
        ref => ref.where( 'name', '==', this.params.board))
        .valueChanges({idField: 'id'});

        this.boards.subscribe(x => {
         x.forEach(x => { this.topics = this.firestore.collection('Posts', ref => ref.where('board', '==', x.id)).valueChanges({idField: 'id'});
                          this.loading = false;
        });
        });
      }

    });


  }

}
