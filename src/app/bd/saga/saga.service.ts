import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constante } from 'src/app/constante';
import { Saga } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class SagaService {


  apiUrl: string = Constante.API_URL;

  
  // apiUrl: string = "http://93.9.238.159:8080";

  constructor(private http: HttpClient) { }

  saveSaga(saga: Saga){
    return this.http.post<Saga>(this.apiUrl + "/saga/save", saga)
  }

  getSagas(){
    return this.http.get<Saga[]>(this.apiUrl + "/saga/all")
  }

  getSaga(id){
    return this.http.get(this.apiUrl + "/saga/" + id)
  }

  delSaga(id){
    return this.http.delete(this.apiUrl + "/saga/" + id)
  }

  getPageSaga(params):Observable<any>{
    return this.http.get(this.apiUrl + "/saga/page", {params})
  }


  printSagas(sagas): Observable<Blob>{
    return this.http.post(this.apiUrl + "/saga/print", sagas ,{ responseType: 'blob'})
  }

  importListe(data: FormData) {
    return this.http.post(this.apiUrl+"/saga/fichier", data);
  }

  delAll(){
    return this.http.delete(this.apiUrl + "/saga/delall")
  }

}
