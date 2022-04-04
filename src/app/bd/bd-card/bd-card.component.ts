import { Component, Input, OnInit } from '@angular/core';
import { Bd } from 'src/app/model';

@Component({
  selector: 'app-bd-card',
  templateUrl: './bd-card.component.html',
  styleUrls: ['./bd-card.component.scss']
})
export class BdCardComponent implements OnInit {

  @Input() bd: Bd;

  
  couleur:string = "rgba(0, 255, 255, .5)";

  constructor() { }

  ngOnInit(): void {
    
    if(this.bd.statut){
      switch (this.bd.statut){

        case "Possédé": {
          this.couleur = "rgba(0, 255, 128, .5)";
          break;
        }

        case "Not Yet": {
          this.couleur = "rgba(255, 0, 128, .5)";
          break;
        }

        case "I Wish": {
          this.couleur = "rgba(0, 128, 255, .5)";
          break;
        }

        default: {
          this.couleur = "rgba(0, 255, 2500, .5)";
        }

      }
    }
  }


}
