import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

constructor(private http: HttpClient) { }
  getData(callback_fun) {
  this.http.get('/api/items').subscribe(data => {
          console.log(data);
         callback_fun(data);
      });
  }
  Adddata(callback_fun,p_name: string, p_price: number, f_tax: number, f_quantity:number){
    this.http.post('/api/items', {name: p_name, price: p_price, quantity: f_quantity, tax: f_tax}).subscribe(data => {
          console.log("POST success!");
          callback_fun(data);
      });
  }
}
