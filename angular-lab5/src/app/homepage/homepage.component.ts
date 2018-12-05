import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ItemsService} from '../items.service';
import { Observable } from 'rxjs';
import {Item} from "../../../server/models/item";
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private response : any;
  private response3 : Observable<any[]>;
  public selected: boolean = false;
  show;
  reviewshow;
  private response2 : Observable<any[]>;
  constructor(private _router: Router, private itemsService: ItemsService) { }

  ngOnInit() {
    providers: [ItemsService];

     this.itemsService.getSortedData(this.onResponse.bind(this));
     
    
   // this.username= url.substr((url.indexOf(':')+1), url.length);
  }
  toLogIn(){
    this._router.navigateByUrl('login');
  }
  toSignUp(){
    this._router.navigateByUrl('signup');
  }
  
   onResponse(res: Observable<any[]>) {
    this.response = res;
   }
   onResponse2(res: Observable<any[]>){
       this.response2 = res;
   }
   onResponse3(res: Observable<any[]>){
       this.response2 = res;
   }
  
  selectedItem: Item;
  onSelect(item: Item): void{
   this.show = !this.show;
   this.selectedItem = item; 
   this.itemsService.getReviews(this.onResponse2.bind(this), this.selectedItem.name);
    
  }
  viewAllItems(){
      this.itemsService.getData(this.onResponse3.bind(this));
  }
  

}
