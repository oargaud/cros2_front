import { Component, OnInit } from '@angular/core';
import { Constante } from 'src/app/constante';
import { Artiste } from 'src/app/model';
import { UserService } from 'src/app/_services/user.service';
import { ArtisteService } from './artiste.service';

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.scss']
})
export class ArtisteComponent implements OnInit {

  artistes: Artiste[];

  totalElements;
  totalPages;
  last;
  first;

  params = {};

  size = 100;
  page = 0;
  filtreLastName;
  filtreFirstName;
  filtreNickName;
  sortDirection ="ASC";
  sortProperty ="lastname";

  sizes = [5,10,25,50,100];

  constructor(
    public userService: UserService,
    private artisteService: ArtisteService) { }

  ngOnInit(): void {
    this.getArtistes();
  }


  getArtistes(){
    this.artisteService.getPageArtiste(this.getParams()).subscribe(
      (response) => {
        const { content, totalElements ,number , totalPages, last, first,size} = response;
        this.artistes = content;
        this.totalElements = totalElements;
        this.page = number;
        this.totalPages = totalPages;
        this.last = last;
        this.first = first;
        this.size = size;
        if(this.page>this.totalPages){
          this.page = 0;
          this.getArtistes();
        }
      }
    );
  }

  delArtiste(id){
    this.artisteService.delArtiste(id).subscribe(
      () => {
        this.getArtistes();
        this.artisteService.getArtistes().subscribe(
          (artistes)=>Constante.ARTISTES = artistes
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
    if(this.filtreFirstName !== undefined){
      this.params[`firstname`] =  this.filtreFirstName;
    } 
    if(this.filtreLastName !== undefined){
      this.params[`lastname`] =  this.filtreLastName;
    } 
    if(this.filtreNickName !== undefined){
      this.params[`nickname`] =  this.filtreNickName;
    }

    return this.params;
  }

  
  previousPage(){
    if(!this.first){
      this.page--;
      this.getArtistes();
    }

  }

  nextPage(){
    if(!this.last){
      this.page++;
      this.getArtistes();
    }
  }

  getPages(pagenumber){
    this.page = pagenumber;
    this.getArtistes();
  }


  toggleTrie(sortPreperty){
    if(this.sortDirection === "ASC" && this.sortProperty === sortPreperty){
      this.sortDirection = "DESC";
    }
    else{
      this.sortDirection = "ASC";
    }
    this.sortProperty = sortPreperty;
    
    this.getArtistes();
  }


}
