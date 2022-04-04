import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constante } from 'src/app/constante';
import { Artiste } from 'src/app/model';
import { ArtisteService } from '../artiste.service';

@Component({
  selector: 'app-artiste-detail',
  templateUrl: './artiste-detail.component.html',
  styleUrls: ['./artiste-detail.component.scss']
})
export class ArtisteDetailComponent implements OnInit {

  artisteForm = this.fb.group({
    lastname: ['', Validators.required],
    firstname: '',
    nickname: ''
  });

  artiste: Artiste;


  constructor(
    private fb: FormBuilder,
    private artisteService: ArtisteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getArtiste();
  }

  saveArtiste(){

    if(this.artisteForm.get('firstname').value.length>0){
      this.artiste.firstname = this.artisteForm.get('firstname').value
    }
    if(this.artisteForm.get('nickname').value.length>0){
      this.artiste.nickname = this.artisteForm.get('nickname').value
    }
    this.artiste.lastname = this.artisteForm.get('lastname').value
 
    this.artisteService.saveArtiste(this.artiste).subscribe(
      (ok)=>{
        if(ok){
          this.router.navigate(['/artiste']);
          this.artisteService.getArtistes().subscribe(
            (artistes)=>Constante.ARTISTES = artistes
          )
        }
        else{
          alert("erreur a l'enregistrement");
        }
      }
    );
  }


  
  getArtiste(){
    const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);
    if(id==="0"){
      this.artiste= new Artiste();
    }
    else{
      this.artisteService.getArtiste(id).subscribe(
        (response)=>{
          this.artiste = response as Artiste;
          console.log(this.artiste);
          this.initForm();
        }
      )
    } 
  }


  initForm(){
  
    this.artisteForm.get('firstname').patchValue(this.artiste.firstname);
    this.artisteForm.get('lastname').patchValue(this.artiste.lastname);
    this.artisteForm.get('nickname').patchValue(this.artiste.nickname);
  
  }


  delArtiste(){
    this.artisteService.delArtiste(this.artiste.id).subscribe(
      ()=> this.router.navigate(['/artiste'])
    )
  }


}
