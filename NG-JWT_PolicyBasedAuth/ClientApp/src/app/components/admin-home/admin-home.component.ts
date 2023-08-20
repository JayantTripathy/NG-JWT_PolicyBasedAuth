import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  adminData: string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  fetchAdminData() {
    this.userService.getAdminData().subscribe(
      (result: any) => {
        this.adminData = result;
      }
    );
  }
}
