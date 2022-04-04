import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Constante } from 'src/app/constante';
import { SagaService } from '../saga.service';

@Component({
  selector: 'app-saga-detail',
  templateUrl: './saga-detail.component.html',
  styleUrls: ['./saga-detail.component.scss']
})
export class SagaDetailComponent implements OnInit {

  sagaForm = this.fb.group({
    name: ''
  });


  constructor(
    private fb: FormBuilder,
    private sagaService: SagaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createSaga(){
    this.sagaService.saveSaga(this.sagaForm.value).subscribe(
      (ok)=>{
        if(ok){
          this.router.navigate(['/saga']);
          this.sagaService.getSagas().subscribe(
            (sagas) => Constante.SAGAS = sagas
          )
        }
        else{
          alert("erreur a l'enregistrement");
        }
      }
    );
  }

}
