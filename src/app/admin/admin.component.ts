import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userList: Utilisateur[];

  constructor( private userService: UserService,) { }

  ngOnInit(): void {
    this.users()
  }

  users(){
      this.userService.getUsers().subscribe(
        (response: Utilisateur[]) => {
          this.userList = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  delUser(username){
    this.userService.delUser(username).subscribe(
      () => {
        this.ngOnInit();
      }
    );

  }

  test(){
    console.log("test");
  }

  detailUser(user){
    console.log(user.userName);
  }

}
