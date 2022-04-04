import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('password2').value
    return pass === confirmPass ? null : { notSame: true }
  }

  loginForm = this.fb.group({
    username :"",
    firstname :"",
    lastname :"",
    email :new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password : new FormControl('',Validators.compose([ Validators.required,Validators.minLength(4)])),
    password2 : new FormControl('',Validators.compose([ Validators.required]))
  },{validators: this.checkPasswords})

 

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  // ngAfterViewChecked(){
  //   this.resetForm();
  // }

  createUtilisateur(){
    this.userService.createUser(this.loginForm.value).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  testForm(){
      console.log(this.loginForm.value);
      console.log(this.loginForm.get("password").value);
  }

  resetForm(){
    this.loginForm.reset();
  }

}
