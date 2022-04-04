import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MqttService } from 'ngx-mqtt';
import { Constante } from 'src/app/constante';
import { Todo } from 'src/app/model';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  todo;

  todoForm = this.fb.group({
    titre: ['', Validators.required],
    priority: ['', Validators.required],
    description:['', Validators.required]
  });


  priorities: number[] = [1,2,3,4,5];

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private userAuthService: UserAuthService,
    private _mqttService: MqttService
  ) { }

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(){
    const id = this.route.snapshot.paramMap.get('id');

    if(id==="0"){
      this.todo = new Todo();
    }
    else{
      this.todoService.getTodo(id).subscribe(
        (response)=>{
          this.todo = response;
          this.intiForm();
        }
      )
    }

  }

  intiForm(){
    this.todoForm.get('titre').patchValue(this.todo.titre);
    this.todoForm.get('priority').patchValue(this.todo.priority);
    this.todoForm.get('description').patchValue(this.todo.description);
  }

  saveTodo(){
    this.todo.titre = this.todoForm.get('titre').value;
    this.todo.priority = this.todoForm.get('priority').value;
    this.todo.description = this.todoForm.get('description').value;
    this.todo.auteur = this.userAuthService.getUser().username
    this.todoService.saveTodo(this.todo).subscribe(
      (ok)=>{
        if(ok){
          this.router.navigate(['/todo']);
          this._mqttService.unsafePublish("todo", JSON.stringify(this.todo), { qos: 1, retain: true });
        }
        else{
          alert("erreur a l'enregistrement");
        }
      }
    );
  }

}
