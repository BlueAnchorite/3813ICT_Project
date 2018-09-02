import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  storedUsername:string = 'blueanchorite';
  storedPassword:string = 'password';

  username:string = '';
  password:string = '';
  errorMessage:string = '';

  constructor(private router: Router, private form: FormsModule) { }

  ngOnInit() {
  }
  
  loginUser(event) {
    
    event.preventDefault();
    console.log(this.username);
    
    if(this.username == this.storedUsername && this.password == this.storedPassword)
    {
      var user = {userid: "1", username: this.username, birth: "1990", age: "28"};
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      this.router.navigate(['/groups']);
    }
    else
    {
      this.errorMessage = "Incorrect login details";
    }
  }

}
