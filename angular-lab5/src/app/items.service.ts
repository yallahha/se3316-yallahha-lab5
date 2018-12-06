import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

constructor(private http: HttpClient) { }
  getSortedData(callback_fun) {
  this.http.get('/api/sortedItems').subscribe(data => {
          console.log(data);
         callback_fun(data);
      });
  }
  getData(callback_fun){
    this.http.get("/api/items").subscribe(data => {
          console.log(data);
         callback_fun(data);
      });
  }
Adddata(callback_fun, fitemname: string, fuser: string, fcomment: string, frating:number){
    this.http.post('/api/reviews/' + fitemname, {email: fuser, comment: fcomment, rating: frating}).subscribe(data => {
          console.log("POST success!");
          callback_fun(data);
      });
      
  }
  getReviews(callback_fun, fname: string){
    this.http.get('/api/reviews/' + fname).subscribe(data => {
        var review = JSON.stringify(data);
        console.log(review);
         callback_fun(data);
      });
  }

  getAllCollections(callback_fun, user){
     this.http.get('/api/getAllCollections/' + user).subscribe(data => {
       console.log(data);
       callback_fun(data['message']);
     });
  }
  collectionCreate(callback_fun, user,name, desc, isprivate){
    this.http.post('/api/newCollection/:' + user, {cartName: name, desc: desc, isprivate: isprivate}).subscribe(data => {
      
       callback_fun(data['message']);
       
    });
  }
  
  allPubColls(callback_fun){
    this.http.get('/api/getEveryCollection').subscribe(data => {
       console.log(data);
       callback_fun(data['message']);
  });
}
}