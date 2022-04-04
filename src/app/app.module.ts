import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './_auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { environment as env } from '../environments/environment';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: env.mqtt.port,
  protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
  path: '',
};



import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';

import { HomeComponent } from './home/home.component';
import { BdComponent } from './bd/bd.component';
import { ControlComponent } from './control/control.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { InscriptionComponent } from './login/inscription/inscription.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { BdDetailComponent } from './bd/bd-detail/bd-detail.component';
import { BdFormComponent } from './bd/bd-form/bd-form.component';
import { SagaComponent } from './bd/saga/saga.component';
import { ArtisteComponent } from './bd/artiste/artiste.component';
import { ArtisteDetailComponent } from './bd/artiste/artiste-detail/artiste-detail.component';
import { SagaDetailComponent } from './bd/saga/saga-detail/saga-detail.component';
import { EditionComponent } from './bd/edition/edition.component';
import { EditionDetailComponent } from './bd/edition/edition-detail/edition-detail.component';
import { BdHeaderComponent } from './bd/bd-header/bd-header.component';
import { BdCardComponent } from './bd/bd-card/bd-card.component';
import { ControlCardComponent } from './control/control-card/control-card.component';
import { TodoComponent } from './todo/todo.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { TodoCardComponent } from './todo/todo-card/todo-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BdComponent,
    ControlComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    InscriptionComponent,
    UserDetailComponent,
    BdDetailComponent,
    BdFormComponent,
    SagaComponent,
    ArtisteComponent,
    ArtisteDetailComponent,
    SagaDetailComponent,
    EditionComponent,
    EditionDetailComponent,
    BdHeaderComponent,
    BdCardComponent,
    ControlCardComponent,
    TodoComponent,
    TodoDetailComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
