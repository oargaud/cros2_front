import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BdComponent } from './bd/bd.component';
import { ControlComponent } from './control/control.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { InscriptionComponent } from './login/inscription/inscription.component';
import { BdDetailComponent } from './bd/bd-detail/bd-detail.component';
import { BdFormComponent } from './bd/bd-form/bd-form.component';
import { SagaComponent } from './bd/saga/saga.component';
import { SagaDetailComponent } from './bd/saga/saga-detail/saga-detail.component';
import { ArtisteComponent } from './bd/artiste/artiste.component';
import { ArtisteDetailComponent } from './bd/artiste/artiste-detail/artiste-detail.component';
import { EditionComponent } from './bd/edition/edition.component';
import { EditionDetailComponent } from './bd/edition/edition-detail/edition-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'bd', component: BdComponent, canActivate:[AuthGuard], data:{roles:['Bd',"BdAdmin"]} },
  { path: 'control', component: ControlComponent ,  canActivate:[AuthGuard], data:{roles:['Control']} },
  { path: 'todo', component: TodoComponent ,  canActivate:[AuthGuard], data:{roles:['Todo',"TodoAdmin"]} },
  { path: 'tododetail/:id', component: TodoDetailComponent, canActivate:[AuthGuard], data:{roles:['Todo',"TodoAdmin"]} },
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'userdetail/:id', component: UserDetailComponent },
  { path: 'bddetail/:id', component: BdDetailComponent, canActivate:[AuthGuard], data:{roles:['Bd',"BdAdmin"]} },
  { path: 'bdform/:id', component: BdFormComponent, canActivate:[AuthGuard], data:{roles:['BdAdmin']} },
  { path: 'saga', component: SagaComponent, canActivate:[AuthGuard], data:{roles:["BdAdmin"]} },
  { path: 'sagadetail/:id', component: SagaDetailComponent, canActivate:[AuthGuard], data:{roles:["BdAdmin"]} },
  { path: 'artiste', component: ArtisteComponent, canActivate:[AuthGuard], data:{roles:["BdAdmin"]} },
  { path: 'artistedetail/:id', component: ArtisteDetailComponent, canActivate:[AuthGuard], data:{roles:["BdAdmin"]} },
  { path: 'edition', component: EditionComponent, canActivate:[AuthGuard], data:{roles:["BdAdmin"]} },
  { path: 'editiondetail/:id', component: EditionDetailComponent, canActivate:[AuthGuard], data:{roles:["BdAdmin"]} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
