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
  private code = '';
  private user = '';
  constructor(private email: EmailService, private router:Router ) { }
  submit(username: string, password:string){
   this.email.Validate(this.onResponse.bind(this), username, password);
   
  console.log(username, password);
  var user = username;
  console.log(username);
  }
 
  ngOnInit() {
  }
  
  
 onResponse(res: string, verificationCode: string, email: string) {
   this.response = res;
    this.code = verificationCode;
    this.user = email
    console.log(this.code);
   if(res=="success"){
       alert("You're In!");
      this.router.navigateByUrl('userhome/' + this.code + '?' + this.user);
    }
    else if(res == "Invalid Username"){
        alert('Username is invalid');
    }
    else if(res == "You must verify your account"){
        alert('You must verify your account');
    }
    else if(res == "Wrong password"){
        alert('Password is invalid');
    }
    
  }
}
