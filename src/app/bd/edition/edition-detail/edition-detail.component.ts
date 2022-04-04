import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Constante } from 'src/app/constante';
import { EditionService } from '../edition.service';

@Component({
  selector: 'app-edition-detail',
  templateUrl: './edition-detail.component.html',
  styleUrls: ['./edition-detail.component.scss']
})
export class EditionDetailComponent implements OnInit {

  
  editionForm = this.fb.group({
    name: ''
  });


  constructor(
    private fb: FormBuilder,
    private editionService: EditionService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createEdition(){
    this.editionService.saveEdition(this.editionForm.value).subscribe(
      (ok)=>{
        if(ok){
          this.router.navigate(['/edition']);
          this.editionService.getEditions().subscribe(
            (editions)=>Constante.EDITIONS = editions
          )
        }
        else{
          alert("erreur a l'enregistrement");
        }
      }
    );
  }
}
