import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constante } from '../constante';
import { Bd } from '../model';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  
  apiUrl: string = Constante.API_URL;

  

  constructor(private http: HttpClient) { }

  saveBd(formData){
    return this.http.post<Bd>(this.apiUrl + "/bd/save", formData)
  }

  getBds(){
    return this.http.get<Bd[]>(this.apiUrl + "/bd/all")
  }

  getBd(id){
    return this.http.get(this.apiUrl + "/bd/" + id)
  }

  delBd(id){
    return this.http.delete(this.apiUrl + "/bd/del/" + id)
  }

  getPageBd(params):Observable<any>{
    return this.http.get(this.apiUrl + "/bd/page", {params})
  }


  printBd(bds): Observable<Blob>{
    return this.http.post(this.apiUrl + "/bd/print", bds ,{ responseType: 'blob'})
  }

  importListe(data: FormData) {
    return this.http.post(this.apiUrl+"/bd/fichier", data);
  }

  delAll(){
    return this.http.delete(this.apiUrl + "/bd/delall")
  }

  saveCouv(){

  }

  getCouv(){

  }


}












