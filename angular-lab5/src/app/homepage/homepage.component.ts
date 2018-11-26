import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ItemsService} from '../items.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private response : Observable<any[]>;
  constructor(private _router: Router, private itemsService: ItemsService) { }

  ngOnInit() {
    providers: [ItemsService]
    var url = this._router.url;
     this.itemsService.getData(this.onResponse.bind(this));
     
    
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
  addItem(fruitname : string, pricefruit : number, taxfruit: number, quantityfruit : number){
      this.itemsService.Adddata(this.onResponse.bind(this), fruitname, pricefruit, taxfruit, quantityfruit);    
  }


}
