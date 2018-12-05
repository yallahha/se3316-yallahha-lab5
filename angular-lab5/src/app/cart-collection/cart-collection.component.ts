import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../items.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-collection',
  templateUrl: './cart-collection.component.html',
  styleUrls: ['./cart-collection.component.css']
})
export class CartCollectionComponent implements OnInit {
  private response = '';

  constructor(private router: Router, private itemsService: ItemsService) { }
  
  ngOnInit() {
   // this.itemsService.allPubColls(this.onResponse.bind(this));
    
  }
  
  
  onResponse(res: string){
      
   }
   
}
