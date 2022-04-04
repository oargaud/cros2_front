import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constante } from '../constante';
import { Control } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  
  apiUrl: string = Constante.API_URL;

  

  constructor(private http: HttpClient) { }

  saveControl(formData){
    return this.http.post<Control>(this.apiUrl + "/control/save", formData)
  }

  getControls(){
    return this.http.get<Control[]>(this.apiUrl + "/control/all")
  }

}
