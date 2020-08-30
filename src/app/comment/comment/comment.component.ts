import { Component, OnInit, Input } from '@angular/core';
import {Comment} from '../../models/comment';
import { UserService } from 'src/app/Controllers/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  authorName;
  @Input() comment: Comment;
  @Input() params;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getName(this.comment.author).then(x => (this.authorName = x));
    console.log(this.params)
  }

  async getName(id: string) {
    return await this.userService.getUserNameById(id).then((x) => x);
  }
}
