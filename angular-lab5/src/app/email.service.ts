import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
//import 'rxjs/add/operator/switchMap';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { 
   // this.user = this.afAuth.authState.switchMap(user => {
  //    if (user){
    //    return this.afs.doc<User>('users/${user.uid}').valueChanges()
      }
  //    else{
    //    return Observable.of(null)
  //  });
  getData(callback_fun){
        this.http.get('/api').subscribe(data=>{
            callback_fun(data['message']);
        }); 
    }
//Creating an account
 createAccount(callback_fun, email, psw){
        console.log(email, psw);
        this.http.post('/api/signup', {'email' : email, 'psw' : psw}).subscribe(data=>{
            callback_fun(data['message']);
        }); 
    }
  //validates account
  postValidate(callback_fun, email, psw){
      this.http.post('/api/login', {'email' : email, 'psw' : psw}).subscribe(data=>{
          console.log(data);
            //special case for admin login
            if (data['message'] == 'admin') {
                localStorage.setItem('user', 'admin');
            }
            if(data['email'] != null){
                callback_fun(data['message']); 
                localStorage.setItem('user', JSON.stringify(data['email']));
                console.log(localStorage.getItem('user'));
            }
            else{
                callback_fun(data['message']);
            }
        }); 
    }
    //sends verification code
    verifyEmail(callback, code){
        this.http.post('/api/verify', {'code': code}).subscribe(data=>{
            callback(data['message']); 
        });
    }
 
}
 