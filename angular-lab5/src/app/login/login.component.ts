import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmailService} from '../email.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private response = '';
  constructor(private email: EmailService, private router:Router ) { }
  submit(username: string, password:string){
   this.email.Validate(this.onResponse.bind(this), username, password);
  console.log(username, password);
  var user = username;
  console.log(username);
  }
  ngOnInit() {
  }
  
  
 onResponse(res: string) {
   this.response = res;
   if(res=="success"){
      this.router.navigateByUrl('userhome');
    }
    if(res == "Username is invalid"){
        alert('Username is invalid');
    }
    if(res == "You must verify your account"){
        alert('You must verify your account');
    }
    if(res == "Password is invalid"){
        alert('Password is invalid');
    }
  }
}
