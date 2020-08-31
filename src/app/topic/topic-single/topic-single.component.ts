import { Component, OnInit, Input } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Controllers/user.service';

@Component({
  selector: 'app-topic-single',
  templateUrl: './topic-single.component.html',
  styleUrls: ['./topic-single.component.css']
})
export class TopicSingleComponent implements OnInit {

  @Input() topic: Topic;
  constructor(private router: ActivatedRoute,
              private userService: UserService) { }

params;
authorName;
authorUrl;

  ngOnInit(): void {
    const route = this.router.params.subscribe(x => {
      this.params = x;
  });
    this.getName(this.topic.author).then(x => (this.authorName = x));
    this.getUrl(this.topic.author).then(x => (this.authorUrl = x));
}

async getName(id: string) {
  return await this.userService.getUserNameById(id).then((x) => x);
}

async getUrl(id: string) {
  return await this.userService.getUserUrlById(id).then((x) => x);
}

}
