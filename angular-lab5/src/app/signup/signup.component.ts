import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmailService} from '../email.service';
import { Observable } from 'rxjs';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 /* signupForm: FormGroup;
  detailForm: FormGroup;
  private response : Observable<any[]>
  */
  response = '';
  constructor(private _router: Router, private emailService : EmailService) { }
  
  ngOnInit() {
     providers: [EmailService]
  }
  NewUser(email:string, pass: string){
  this.emailService.createAccount(this.onResponse.bind(this), email, pass);    
  }
  
 onResponse(res: string) {
    this.response = res;
    if(res == "User created"){
      console.log('user created');
      this._router.navigateByUrl('verify');
    }
 }
  
}
