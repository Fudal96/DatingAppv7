import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
model: any = {};
loggedIn = false;


constructor(private accountService: AccountService) {}


  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      // the below method with !! turns it into a boolean and return true if we have a user and false if we don't have a user
      next: user => this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }

}
