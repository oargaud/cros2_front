import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constante } from 'src/app/constante';
import { Artiste, Bd, Saga } from 'src/app/model';
import { Edition } from 'src/app/model/Edition';
import { ArtisteService } from '../artiste/artiste.service';
import { BdService } from '../bd.service';
import { EditionService } from '../edition/edition.service';
import { SagaService } from '../saga/saga.service';

@Component({
  selector: 'app-bd-form',
  templateUrl: './bd-form.component.html',
  styleUrls: ['./bd-form.component.scss']
})
export class BdFormComponent implements OnInit {


  bd: Bd = new Bd();
  selectedFile: File;
  url: any;

  listeStatut: string[] = Constante.STATUT;
  listSaga: Saga[] = Constante.SAGAS;
  listEdition: Edition[] = Constante.EDITIONS;
  listArtist: Artiste[] = Constante.ARTISTES;


  bdForm = this.fb.group({
    titre: ['', Validators.required],
    tome: [''],
    statut:['', Validators.required],
    saga: [''],
    edition:[''],
    scenaristes:this.fb.array([
      this.fb.control('')
    ]),
    illustrateurs:this.fb.array([
        this.fb.control('')
      ])
  });

  constructor(
    public bdService:BdService,
    private fb: FormBuilder,
    private sagaService: SagaService,
    private artisteService: ArtisteService,
    private editionService: EditionService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
   
    // this.getSagas();
    // this.getArtistes();  
    // this.getEditions();    
    this.getBds();

  }

  initForm(){

  
    this.bdForm.get('titre').patchValue(this.bd.titre);
    this.bdForm.get('tome').patchValue(this.bd.tome);
    this.bdForm.get('statut').patchValue(this.bd.statut);
    this.bdForm.get('saga').patchValue(Constante.SAGAS.filter((saga)=>saga.id===this.bd.saga.id)[0] );
    this.bdForm.get('edition').patchValue(Constante.EDITIONS.filter((edition)=>edition.id===this.bd.edition.id)[0]);

    this.scenaristes.clear();
    this.bd.scenaristes.forEach(scene => {
      this.scenaristes.push(this.fb.control(Constante.ARTISTES.filter((artiste)=>artiste.id===scene.id)[0]));
    });

    this.illustrateurs.clear();
    this.bd.illustrateurs.forEach(illu => {
      this.illustrateurs.push(this.fb.control(Constante.ARTISTES.filter((artiste)=>artiste.id===illu.id)[0]));
    });

    this.selectedFile = this.bd.photo.photo;

  }

  getBds(){
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if(id==="0"){
      this.bd= new Bd();
    }
    else{
      this.bdService.getBd(id).subscribe(
        (response)=>{
          this.bd = response as Bd;
          console.log(this.bd);
          this.initForm();
        }
      )
    } 
  }

  // getSagas(){
  //   this.sagaService.getSagas().subscribe(
  //     (reponse) => {
  //       this.listSaga = reponse;
  //       console.log(this.listSaga);
  //       this.getArtistes();  
  //     }
  //   );
  // }

  // getArtistes(){
  //   this.artisteService.getArtistes().subscribe(
  //     (reponse) => {
  //       this.listArtist = reponse;
  //       this.getEditions(); 
  //     }
  //   );
  // }

  // getEditions(){
  //   this.editionService.getEditions().subscribe(
  //     (reponse) => {
  //       this.listEdition = reponse;
  //       this.getBd();
  //     }
  //   );
  // }

  //Gets called when the user selects an image
  public onFileChanged(event:any) {
    //Select File
    this.loadFile(event.target.files[0]);

  }

  loadFile(file){
    this.selectedFile = file;

    var reader = new FileReader();
    reader.readAsDataURL(file); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target!.result;
    }
  }


  @ViewChild('file') fileInput: any;

  supprimerFichier(){
    this.fileInput.nativeElement.value = null;
    this.selectedFile = null;
    this.url = null;
    this.bd.photo = null;
  }



  validForm(){


    this.bd.titre = this.bdForm.get('titre').value;
    this.bd.tome = this.bdForm.get('tome').value;
    this.bd.statut = this.bdForm.get('statut').value;
    this.bd.saga = this.bdForm.get('saga').value;
    this.bd.edition = this.bdForm.get('edition').value;
    this.bd.scenaristes = this.bdForm.get('scenaristes').value;
    this.bd.illustrateurs = this.bdForm.get('illustrateurs').value;


    const formData = new FormData();
    formData.append("photo", this.selectedFile);
    formData.append("bd", JSON.stringify(this.bd));
   
    this.bdService.saveBd(formData).subscribe(
      (response) => {
        this.router.navigate(['/bd']);
      }
    )

  }


  get scenaristes() {
    return this.bdForm.get('scenaristes') as FormArray;
  }

  addScenariste() {
    this.scenaristes.push(this.fb.control(''));
  }

  removeScenariste(index:number){
     this.scenaristes.removeAt(index);
  }


  get illustrateurs() {
    return this.bdForm.get('illustrateurs') as FormArray;
  }

  addIllustrateur() {
    this.illustrateurs.push(this.fb.control(''));
  }

  removeIllustrateur(index:number){
     this.illustrateurs.removeAt(index);
  }



  delete(){
    this.bdService.delBd(this.bd.id).subscribe(
      ()=>this.router.navigate(['/bd'])
    )
  }



}
