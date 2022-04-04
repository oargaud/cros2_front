import { Component, OnInit } from '@angular/core';
import { Constante } from 'src/app/constante';
import { Edition } from 'src/app/model/Edition';
import { UserService } from 'src/app/_services/user.service';
import { EditionService } from './edition.service';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  
  editions: Edition[];

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
    private editionService: EditionService) { }

  ngOnInit(): void {
    this.getEditions();
  }


  getEditions(){
    this.editionService.getPageEdition(this.getParams()).subscribe(
      (response) => {
        const { content, totalElements ,number , totalPages, last, first,size} = response;
        this.editions = content;
        this.totalElements = totalElements;
        this.page = number;
        this.totalPages = totalPages;
        this.last = last;
        this.first = first;
        this.size = size;
        if(this.page>this.totalPages){
          this.page = 0;
          this.getEditions();
        }
      }
    );
  }

  delEdition(id){
    this.editionService.delEdition(id).subscribe(
      () => {
        this.getEditions();
        this.editionService.getEditions().subscribe(
          (editions)=>Constante.EDITIONS = editions
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
      this.getEditions();
    }

  }

  nextPage(){
    if(!this.last){
      this.page++;
      this.getEditions();
    }
  }

  getPages(pagenumber){
    this.page = pagenumber;
    this.getEditions();
  }


  toggleTrie(sortPreperty){
    if(this.sortDirection === "ASC" && this.sortProperty === sortPreperty){
      this.sortDirection = "DESC";
    }
    else{
      this.sortDirection = "ASC";
    }
    this.sortProperty = sortPreperty;
    
    this.getEditions();
  }

}
