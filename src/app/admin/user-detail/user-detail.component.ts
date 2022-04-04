import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, Utilisateur } from 'src/app/model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: Utilisateur;
  roles: Role[];
  selectedRole: String;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const id = this.route.snapshot.paramMap.get('id');

    this.userService.getUser(id).subscribe(
      (response: Utilisateur) => {
        this.user = response;
        this.getRoles();
      },
      (error) => {
        console.log(error);
      }
    );


  }

  getRoles(){
    this.userService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
        this.user.roles.forEach(
          (role)=>{
            this.roles = this.roles.filter(
              (r)=> r.roleName!==role.roleName
            )
          }
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }


  fonctionFiltre(element, index, array){
    console.log(element);
    console.log(index);
    console.log(array);
    this.user.roles.forEach((r)=>{
      if(r=element){
        return false;
      }
    })
    return true;
  }


  delUser(){
    this.userService.delUser(this.user.username).subscribe(
      (ok)=>{
        if(ok){this.router.navigate(['/admin']);}
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  removeRoleToUser(role){
    this.user.roles = this.user.roles.filter( r => r !== role);
    this.saveUser();
  }

  addRoleToUser(){
    let roleToAdd = this.roles.filter(r => r.roleName === this.selectedRole)[0];
    this.user.roles.push(roleToAdd);
    this.saveUser();
  }

  saveUser(){
    this.userService.saveUser(this.user).subscribe(
      (response: Utilisateur) => {
        this.user = response;
        this.getUser();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
