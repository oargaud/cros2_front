import { Component, OnInit } from '@angular/core';
import { ArtisteService } from './bd/artiste/artiste.service';
import { BdService } from './bd/bd.service';
import { EditionService } from './bd/edition/edition.service';
import { SagaService } from './bd/saga/saga.service';
import { Constante } from './constante';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {

 

  }
  
  title = 'front';
}
