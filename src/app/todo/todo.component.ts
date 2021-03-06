import { Component, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
import { Todo } from '../model';
import { UserService } from '../_services/user.service';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  
  vueTable = false;

  constructor(
    public userService:UserService,
    private todoService:TodoService,
    private _mqttService: MqttService
  ) { }

  ngOnInit(): void {
    this.getTodos();
    this.subscribe();
  }

  getTodos(){
    this.todoService.getTodos().subscribe(
      (response)=>{
        this.todos = response;
      }
    )
  }


  subscribe(){
    this._mqttService.observe("todo").subscribe(
      ()=>{
        this.getTodos();
      }
    )
  }

}
