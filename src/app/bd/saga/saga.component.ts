import { Component, OnInit } from '@angular/core';
import { Constante } from 'src/app/constante';
import { Saga } from 'src/app/model';
import { UserService } from 'src/app/_services/user.service';
import { SagaService } from './saga.service';

@Component({
  selector: 'app-saga',
  templateUrl: './saga.component.html',
  styleUrls: ['./saga.component.scss']
})
export class SagaComponent implements OnInit {

  sagas: Saga[];

  totalElements;
  totalPages;
  last;
  first;

  params = {};

  size = 5;
  page = 0;
  filtreNom;
  sortDirection ="ASC";
  sortProperty ="name";

  sizes = [5,10,25,50,100];

  constructor(
    public userService: UserService,
    private sagaService: SagaService) { }

  ngOnInit(): void {
    this.getSagas();
  }


  getSagas(){
    this.sagaService.getPageSaga(this.getParams()).subscribe(
      (response) => {
        const { content, totalElements ,number , totalPages, last, first,size} = response;
        this.sagas = content;
        this.totalElements = totalElements;
        this.page = number;
        this.totalPages = totalPages;
        this.last = last;
        this.first = first;
        this.size = size;
        if(this.page>this.totalPages){
          this.page = 0;
          this.getSagas();
        }
      }
    );
  }

  delSaga(id){
    this.sagaService.delSaga(id).subscribe(
      () => {
        this.getSagas();
        this.sagaService.getSagas().subscribe(
          (sagas)=> Constante.SAGAS = sagas
        )
      }
    );
  }


  getParams(){

    if(this.page !== undefined){
      this.params[`page`] =  this.page;
    }
    if(this.size !== undefined){
      this.params[`size`] =  this.size;
    }
    if(this.sortProperty !== undefined){
      this.params[`sortProperty`] =  this.sortProperty;
    }
    if(this.sortDirection !== undefined){
      this.params[`sortDirection`] =  this.sortDirection;
    }
    if(this.filtreNom !== undefined){
      this.params[`name`] =  this.filtreNom;
    }

    return this.params;
  }

  
  previousPage(){
    if(!this.first){
      this.page--;
      this.getSagas();
    }

  }

  nextPage(){
    if(!this.last){
      this.page++;
      this.getSagas();
    }
  }

  getPages(pagenumber){
    this.page = pagenumber;
    this.getSagas();
  }


  toggleTrie(sortPreperty){
    if(this.sortDirection === "ASC" && this.sortProperty === sortPreperty){
      this.sortDirection = "DESC";
    }
    else{
      this.sortDirection = "ASC";
    }
    this.sortProperty = sortPreperty;
    
    this.getSagas();
  }


}
