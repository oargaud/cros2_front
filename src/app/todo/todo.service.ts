import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from '../constante';
import { Todo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = Constante.API_URL;

  
  constructor(private http: HttpClient) { }


  saveTodo(formData){
    return this.http.post<Todo>(this.apiUrl + "/todo/save", formData)
  }

  getTodos(){
    return this.http.get<Todo[]>(this.apiUrl + "/todo/all")
  }

  getTodo(id){
    return this.http.get(this.apiUrl + "/todo/" + id)
  }

  delTodo(id){
    return this.http.delete(this.apiUrl + "/todo/del/" + id)
  }

}
