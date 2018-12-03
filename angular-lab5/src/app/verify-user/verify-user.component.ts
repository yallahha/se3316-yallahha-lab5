import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmailService} from '../email.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  constructor(private router: Router, private emailService : EmailService) { }
  response = '';
  id;
  ngOnInit() {
     var url = this.router.url;
    
    //use substring to get the username and the msg room ID
    this.id= url.substr((url.indexOf('?')+1), url.length);
     providers: [EmailService]
  }
  
  checkCode(code: string){
    this.emailService.verifyEmail(this.onResponse.bind(this), code);
  }
    onResponse(res: string){
    this.response = res; 
    if(res == "verification success"){
      console.log('sss')
      this.router.navigateByUrl('login'); 
    }
  }
  backToLogin(){
    this.router.navigateByUrl('login');
  }
  
}
