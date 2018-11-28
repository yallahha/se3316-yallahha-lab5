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
   this.email.postValidate(this.onResponse.bind(this), username, password);
  console.log(username, password);
  }
  ngOnInit() {
  }
 onResponse(res: string) {
   this.response = res;
   if(res=="success"){
      this.router.navigateByUrl('userhome')
    }
    else if (res == "admin"){
      this.router.navigateByUrl('admin')
    }
  }
}
