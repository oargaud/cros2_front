import { Component, OnInit } from '@angular/core';
import { Constante } from '../constante';
import { Artiste, Bd, Saga } from '../model';
import { Edition } from '../model/Edition';
import { UserService } from '../_services/user.service';
import { ArtisteService } from './artiste/artiste.service';
import { BdService } from './bd.service';
import { EditionService } from './edition/edition.service';
import { SagaService } from './saga/saga.service';

@Component({
  selector: 'app-bd',
  templateUrl: './bd.component.html',
  styleUrls: ['./bd.component.scss']
})
export class BdComponent implements OnInit {

  bds: Bd[];

  totalElements;
  totalPages;
  last;
  first;

  params = {};

  size = Constante.PAGE_SIZE[0];
  page = 0;
  filtreTitre;
  filtreTome;
  filtreStatut;
  filtreSaga;
  filtreEdition;
  filtreScenariste;
  filtreIllustrateur;
  sortDirection ="ASC";
  sortProperty ="titre";

  sizes = Constante.PAGE_SIZE;
  listeStatut: string[] = Constante.STATUT;
  listeSaga: Saga[] = Constante.SAGAS;
  listeEdition: Edition[] = Constante.EDITIONS;
  listeIllustrateur: Artiste[] = Constante.ARTISTES;
  listeScenariste: Artiste[] = Constante.ARTISTES;
  vueTable = false;

  constructor(
    
    private sagaService: SagaService,
    private artisteService: ArtisteService,
    private editionService: EditionService,
    public userService: UserService,
    private bdService: BdService) { }

  ngOnInit(): void {    
    this.getBds();
    this.initConstante();
  }

  initConstante(){

    this.sagaService.getSagas().subscribe(
      (response)=>{
        Constante.SAGAS = response;
        this.listeSaga = response;
        // console.log("sagas ");
        // console.log(Constante.SAGAS);
        // console.log(this.listeSaga);
        
      }
    )

    this.artisteService.getArtistes().subscribe(
      (response)=>{
        Constante.ARTISTES = response;
        this.listeIllustrateur = response;
        this.listeScenariste = response;
      }
    )

    this.editionService.getEditions().subscribe(
      (response)=>{
        Constante.EDITIONS = response;
        this.listeEdition = response;
      }
    )

  }

  getBds(){
    this.bdService.getPageBd(this.getParams()).subscribe(
      (response) => {
        const { content, totalElements ,number , totalPages, last, first,size} = response;
        this.bds = content;
        this.totalElements = totalElements;
        this.page = number;
        this.totalPages = totalPages;
        this.last = last;
        this.first = first;
        this.size = size;
        if(this.page>this.totalPages){
          this.page = 0;
          this.getBds();
        }
      }
    );
  }

  delBd(id){
    this.bdService.delBd(id).subscribe(
      () => {
        this.getBds();
      }
    );
  }


  getParams(){

    this.params = {};

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
    if(this.filtreTitre !== undefined){
      this.params[`titre`] =  this.filtreTitre;
    } 
    if(this.filtreTome !== undefined){
      this.params[`tome`] =  this.filtreTome;
    }
    if(this.filtreStatut !== undefined){
      this.params[`statut`] =  this.filtreStatut;
    }
    if(this.filtreSaga !== undefined){
      this.params[`saga`] =  this.filtreSaga;
    }
    if(this.filtreEdition !== undefined && this.filtreEdition.name !== undefined){
      this.params[`edition`] =  this.filtreEdition.name;
    }
    if(this.filtreScenariste !== undefined){
      this.params[`scenariste`] =  this.filtreScenariste;
    }
    if(this.filtreIllustrateur !== undefined){
      this.params[`illustrateur`] =  this.filtreIllustrateur;
    }


    return this.params;
  }

  
  previousPage(){
    if(!this.first){
      this.page--;
      this.getBds();
    }

  }

  nextPage(){
    if(!this.last){
      this.page++;
      this.getBds();
    }
  }

  getPages(pagenumber){
    if(pagenumber<0){
      pagenumber = 0;
    }
    if(pagenumber>this.totalPages-1){
      pagenumber = this.totalPages -1;
    }
    this.page = pagenumber;
    this.getBds();
  }


  toggleTrie(sortPreperty){
    if(this.sortDirection === "ASC" && this.sortProperty === sortPreperty){
      this.sortDirection = "DESC";
    }
    else{
      this.sortDirection = "ASC";
    }
    this.sortProperty = sortPreperty;
    
    this.getBds();
  }

}
