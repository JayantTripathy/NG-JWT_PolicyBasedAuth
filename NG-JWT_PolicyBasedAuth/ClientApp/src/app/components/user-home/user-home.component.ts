import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  userData: string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  fetchUserData() {
    this.userService.getUserData().subscribe(
      (result: any) => {
        this.userData = result;
      }
    );
  }
}
