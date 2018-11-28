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
  ngOnInit() {
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
  
}
