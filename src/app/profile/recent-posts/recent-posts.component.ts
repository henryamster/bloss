import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {
  posts;
  comments;
  @Input() authorId: string;

  constructor(private firestore: AngularFirestore) {

   }

  ngOnInit(): void {
    this.posts = this.firestore.collection('Posts', ref => ref.where('author', '==', this.authorId).limit(10))
    .valueChanges({ idField: 'id' });
    this.comments = this.firestore.collection('Comment', ref => ref.where('author', '==',  this.authorId).limit(10))
    .valueChanges({ idField: 'id' });
    console.log([this.comments,this.posts]);
  }

}
