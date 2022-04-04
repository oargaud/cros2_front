import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  alert = null;
  timeLeft: number = 5;
  interval;

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {

        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUser(response.user);
        this.router.navigate(['/home']);

      },
      (error) => {
        console.log(error);
        this.alert = error.error.message;
      }
    );
  }

}
