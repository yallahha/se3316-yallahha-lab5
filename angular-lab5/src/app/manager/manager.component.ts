import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../items.service';
import { Observable } from 'rxjs';
import {EmailService} from '../email.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  private response3: Observable<any[]>;
  private response2: Observable<any[]>;
  private response: Observable<any[]>;
  constructor( private itemsService: ItemsService, private emailService: EmailService) { }
  
  ngOnInit() {
    this.itemsService.getDataAdmin(this.onResponse3.bind(this));
     this.emailService.getAllUsers(this.onResponse.bind(this));
  }
onResponse3(res: Observable<any[]>){
       this.response3 = res;
   }
   onResponse2(res: Observable<any[]>){
       this.response2 = res;
   }
   
  onResponse(res: Observable<any[]>){
       this.response= res;
   }
   saveItem(name: string, price: number, quantity: number, desc: string){
       this.itemsService.AdddataAdmin(this.onResponse2.bind(this), name, price, quantity, desc);
   }

}
