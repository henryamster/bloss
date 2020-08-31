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
  authorUrl;
  authorAvatar;
  @Input() comment: Comment;
  @Input() params;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getName(this.comment.author).then(x => (this.authorName = x));
    this.getUrl(this.comment.author).then(x => (this.authorUrl = x));
    this.getAvatar(this.comment.author).then(x => (this.authorAvatar = x));
    console.log(this.params);
  }

  async getName(id: string) {
    return await this.userService.getUserNameById(id).then((x) => x);
  }

  async getUrl(id: string) {
    return await this.userService.getUserUrlById(id).then((x) => x);
  }


  async getAvatar(id: string) {
    return await this.userService.getAviById(id).then((x) => x);
  }
}
