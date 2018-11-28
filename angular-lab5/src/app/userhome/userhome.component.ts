import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmailService} from '../email.service';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private router: Router, private emailService: EmailService) { }

  ngOnInit() {
  }
    Logout(){
    this._router.navigateByUrl('');
  }

}
