import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  username:string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.username = user.username;
    
    localStorage.clear();
    console.log(this.username);
    this.router.navigate(['/login']);
  }

}
