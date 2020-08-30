import { Component, OnInit, Input } from '@angular/core';
import { Topic } from 'src/app/models/topic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-single',
  templateUrl: './topic-single.component.html',
  styleUrls: ['./topic-single.component.css']
})
export class TopicSingleComponent implements OnInit {

  @Input() topic:Topic;
  constructor(private router: ActivatedRoute) { }
params;

  ngOnInit(): void {
    const route = this.router.params.subscribe(x => {
      this.params = x;
  });

}
}
