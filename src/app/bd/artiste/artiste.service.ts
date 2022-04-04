import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constante } from 'src/app/constante';
import { Artiste } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class ArtisteService {

 
  apiUrl: string = Constante.API_URL;

  
  // apiUrl: string = "http://93.9.238.159:8080";

  constructor(private http: HttpClient) { }

  saveArtiste(artiste: Artiste){
    return this.http.post<Artiste>(this.apiUrl + "/artiste/save", artiste)
  }

  getArtistes(){
    return this.http.get<Artiste[]>(this.apiUrl + "/artiste/all")
  }

  getArtiste(id){
    return this.http.get(this.apiUrl + "/artiste/" + id)
  }

  delArtiste(id){
    return this.http.delete(this.apiUrl + "/artiste/" + id)
  }

  getPageArtiste(params):Observable<any>{
    return this.http.get(this.apiUrl + "/artiste/page", {params})
  }


  printArtistes(artistes): Observable<Blob>{
    return this.http.post(this.apiUrl + "/artiste/print", artistes ,{ responseType: 'blob'})
  }

  importListe(data: FormData) {
    return this.http.post(this.apiUrl+"/artiste/fichier", data);
  }

  delAll(){
    return this.http.delete(this.apiUrl + "/artiste/delall")
  }
}
