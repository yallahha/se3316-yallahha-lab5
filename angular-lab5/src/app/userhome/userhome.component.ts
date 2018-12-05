import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmailService} from '../email.service';
import {ItemsService} from '../items.service';
import { Observable } from 'rxjs';
import {Item} from "../../../server/models/item";
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
private response = '';
  private toCreateNC: Boolean = false;    
  private shopCart: any;
  private response2 : Observable<any[]>;
  private response3 = '';
  private username = '';
  show;
  reviewshow;
  constructor(private router: Router, private emailService: EmailService, private itemsService: ItemsService) { }

  ngOnInit() {
    providers: [ItemsService];
    this.itemsService.getSortedData(this.onResponse.bind(this));
    var url = this.router.url;
    this.username = url.substring((url.indexOf('?')+1), url.length-1);
     this.itemsService.getAllCollections(this.onResponse3.bind(this), this.username);
    
    
  }
    Logout(){
    this.router.navigateByUrl('');
  }
  
  allPublicColl(){
      this.router.navigateByUrl('pubCollections');
  }
  
    
 
  
   onResponse(res: string) {
    this.response = res;
    if(res == "Collection is created"){
        alert("Collection is created");
    }
    if(res == "You already have a collection with the same name"){
        alert("Duplicate collection name");
    }
   }
   onResponse2(res: Observable<any[]>){
       this.response2 = res;
   }
   onResponse3(res: string){
    this.response3 = res;
   }
  addComment(fitemname, fuser, fcomment, frating){
      this.itemsService.Adddata(this.onResponse.bind(this), fitemname, fuser, fcomment, frating);    
  }
  selectedItem: Item;
  onSelect(item: Item): void{
   this.show = !this.show;
   this.selectedItem = item; 
   this.itemsService.getReviews(this.onResponse2.bind(this), this.selectedItem.name);
    
  }
  viewAllItems(){
      this.itemsService.getData(this.onResponse.bind(this));
  }
  addtoCart(){
      
  }
  addACollection(){
      this.toCreateNC = true;
      
  }
  createCollection(name: string, desc: string, isprivate: string){

    this.itemsService.collectionCreate(this.onResponse.bind(this), this.username, name, desc, isprivate);
    
  }

}
