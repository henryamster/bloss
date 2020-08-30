import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSingleComponent } from './board-single.component';

describe('BoardComponent', () => {
  let component: BoardSingleComponent;
  let fixture: ComponentFixture<BoardSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
