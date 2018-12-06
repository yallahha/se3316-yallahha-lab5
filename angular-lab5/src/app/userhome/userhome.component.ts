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
private response : any;
  private toCreateNC: Boolean = false;    
  private response2 : Observable<any[]>;
  private response3 : any;
  private response4: any;
  private username = '';
  private shopCart : Item[] = [];
  private receiptcart : Item[] = [];
  private  price: number = 0;
  private recipt: boolean = false;
  private index: number = 0;
  private finalTotal : number = 0;
  show;
  reviewshow;
  constructor(private router: Router, private emailService: EmailService, private itemsService: ItemsService) { }

  ngOnInit() {
    providers: [ItemsService];
    this.itemsService.getData(this.onResponse.bind(this));
    var url = this.router.url;
    this.username = url.substring((url.indexOf('?')+1), url.length-1);
    // this.itemsService.getAllCollections(this.onResponse3.bind(this), this.username);
    
  }
    Logout(){
    this.router.navigateByUrl('');
  }
  
  allPublicColl(){
      this.router.navigateByUrl('pubCollections');
  }
  
    
 
  
   onResponse(res: any) {
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
   onResponse3(res: any){
    this.response3 = res;
   }
   onResponse4(res: any){
    this.response4 = res;
   }
  addComment(fitemname : string, fuser: string, fcomment: string, frating: string){
    //  this.itemsService.Adddata(this.onResponse4.bind(this), fitemname, fuser, fcomment, frating);    
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
  addtoCart(Iname: string, Iprice: string, Iquantity: number, Ioldquantity: number){
      if(Iquantity < 1 || Iquantity > Ioldquantity) 
          return alert("You must enter between 0 and available quantity");
           var ItemtoAdd = {name: Iname, price: Iprice, quantity: Iquantity, oldQuantity: Ioldquantity};
      if(this.index > 0){
          for (let j = 0; j<this.index; j++){
            if (this.shopCart[j].name == Iname) {
              break;
          }
        else if (j == this.index - 1 && this.shopCart[j].name != Iname){
            this.index = this.shopCart.push(ItemtoAdd);
            this.price +=ItemtoAdd.price * ItemtoAdd.quantity;
        }
      }
  }
  else{
      this.index = this.shopCart.push(ItemtoAdd);
      this.price += (ItemtoAdd.price * ItemtoAdd.quantity);
    }
    console.log(this.shopCart);
  }

  editquan(itemName: string, itemedit: number) {
    for (let j = 0; j < this.index; j++) {
      if (this.shopCart[j].name == itemName) {
        if (itemedit > this.shopCart[j].oldQuantity) 
            return alert("Error.");
        var oldquantity = this.shopCart[j].quantity;
        this.price -= oldquantity * this.shopCart[j].price;
        this.shopCart[j].quantity = itemedit;
        this.price += this.shopCart[j].price * itemedit;
      }
    }
    console.log(this.shopCart);
  }
  
  remove(itemName: string){
      for(let j = 0; j< this.index; j++){
          if(this.shopCart[j].name == itemName){
              this.price = this.price - (this.shopCart[j].price * this.shopCart[j].quantity);
          }
      }
      this.shopCart = this.shopCart.filter(
        item => item.name != itemName);
        this.index--;
      }
   empty() {
    if (confirm("Are you sure you want to empty the shopping cart?")) {
      this.shopCart = [];
      this.index = 0;
      this.price = 0;
    }
  }
  buy() {
    if (this.index < 1)   return alert("it cannot be email!");
    if (confirm("Would you like to buy ALL these items?")) {
      this.recipt = true;
      this.receiptcart = this.shopCart;
      this.finalTotal = this.price;
      this.itemsService.BuyCart(this.shopCart, this.index, this.onResponse.bind(this));
      this.empty();
      this.itemsService.getData(this.onResponse.bind(this));
    }
  }
  
  addACollection(){
      this.toCreateNC = true;
      
  }
  createCollection(name: string, desc: string, isprivate: string){

    this.itemsService.collectionCreate(this.onResponse.bind(this), this.username, name, desc, isprivate);
    
  }

}

