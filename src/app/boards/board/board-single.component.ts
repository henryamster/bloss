import { Component, OnInit, Input } from '@angular/core';
import { Board } from 'src/app/models/board';

@Component({
  selector: 'app-board-single',
  templateUrl: './board-single.component.html',
  styleUrls: ['./board-single.component.css']
})
export class BoardSingleComponent implements OnInit {

  @Input() board: Board;
  @Input() parentUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
