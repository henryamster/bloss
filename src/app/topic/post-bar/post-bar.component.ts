import { Component, OnInit, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-post-bar',
  templateUrl: './post-bar.component.html',
  styleUrls: ['./post-bar.component.scss']
})
export class PostBarComponent implements OnInit {
  @ViewChild('quill')
  quillEd: QuillEditorComponent;
  constructor() { }
value;
  openPostBay(){
    this.quillEd?.onContentChanged.forEach(x=>console.log(x));
  }
  ngOnInit(): void {
    this.quillEd?.onContentChanged.forEach(x=>console.log(x));
  }

}
