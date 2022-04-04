import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constante } from 'src/app/constante';
import { Edition } from 'src/app/model/Edition';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  
  apiUrl: string = Constante.API_URL;

  
  // apiUrl: string = "http://93.9.238.159:8080";

  constructor(private http: HttpClient) { }

  saveEdition(edition: Edition){
    return this.http.post<Edition>(this.apiUrl + "/edition/save", edition)
  }

  getEditions(){
    return this.http.get<Edition[]>(this.apiUrl + "/edition/all")
  }

  getEdition(id){
    return this.http.get(this.apiUrl + "/edition/" + id)
  }

  delEdition(id){
    return this.http.delete(this.apiUrl + "/edition/" + id)
  }

  getPageEdition(params):Observable<any>{
    return this.http.get(this.apiUrl + "/edition/page", {params})
  }


  printEditions(edition): Observable<Blob>{
    return this.http.post(this.apiUrl + "/edition/print", edition ,{ responseType: 'blob'})
  }

  importListe(data: FormData) {
    return this.http.post(this.apiUrl+"/edition/fichier", data);
  }

  delAll(){
    return this.http.delete(this.apiUrl + "/edition/delall")
  }
}
