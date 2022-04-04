import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  @Input() todo: Todo;
  
  constructor() { }

  ngOnInit(): void {
  }

}
