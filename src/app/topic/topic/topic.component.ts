import { Component, OnInit, Input } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Controllers/user.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {
  topic: Observable<Topic>;
  topics: Observable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {
    const router = this.route.params.subscribe((x) => {
      this.params = x;
      this.topicDoc = this.firestore.doc<Topic>('Posts/' + x.post);
    });
  }
  params;
  topicNotFound = false;
  topicDoc;
  loading = true;
  authorName;
  authorDetails;
  topicId;
  comments: Observable<any[]>;

  hasContentLoaded() {
    this.topic?.subscribe((x) => {
      if (!x.topic) {
        this.topicNotFound = true;
      } else {
        this.topicNotFound = false;
        this.topicId = x.id;
        console.log(x)
        this.getName(x.author).then(x => (this.authorName = x));
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.topicDoc.ref.get().then((x) => {
      this.topic = this.topicDoc.valueChanges({ idField: 'id' });
      this.hasContentLoaded();
      this.comments = this.firestore.collection('Comment', ref => ref.where('parentTopic', '==', this.params.post)).valueChanges({ idField: 'id' });
      console.log(this.comments);
    });



  }

  async getName(id: string) {
    return await this.userService.getUserNameById(id).then((x) => x);
  }

}
