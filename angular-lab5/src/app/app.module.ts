import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { UserhomeComponent } from './userhome/userhome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import { ManagerComponent } from './manager/manager.component';
import { CartCollectionComponent } from './cart-collection/cart-collection.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    VerifyUserComponent,
    UserhomeComponent,
    ManagerComponent,
    CartCollectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([
       {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
      path: 'verify',
      component: VerifyUserComponent
      }, 
      {
        path: 'userhome/:id',
        component: UserhomeComponent
      },
      {
        path: 'manager',
        component : ManagerComponent
      },
      {
        path: 'pubCollections',
        component: CartCollectionComponent
      }
      ])
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
