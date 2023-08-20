import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodeUserDetails: any;
  url: string = 'https://localhost:7245';
  userData = new BehaviorSubject<User>(new User());
  
  constructor(private http: HttpClient, private router: Router) { }

  login(userDetails: any) {
    return this.http.post<any>(this.url + '/api/login', userDetails)
      .pipe(map(response => {
        localStorage.setItem('authToken', response.token);
        this.setUserDetails();
        return response;
      }));
  }

  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      
      var localStoragevalue = localStorage.getItem('authToken');
      if(localStoragevalue){
        this.decodeUserDetails = JSON.parse(window.atob(localStoragevalue.split('.')[1]));
      }
      

      userDetails.userName = this.decodeUserDetails.sub;
      userDetails.firstName = this.decodeUserDetails.firstName;
      userDetails.isLoggedIn = true;
      userDetails.role = this.decodeUserDetails.role;

      this.userData.next(userDetails);
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
    this.userData.next(new User());
  }
}