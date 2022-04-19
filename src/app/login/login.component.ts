import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedInUser = false;
  constructor(private http: HttpClient, private _router: Router, public _authService: AuthService) { }
  ngOnInit(): void {
  
  }

  LoginWithIDP()
  {
    this._authService.startAuthentication();
  }
  isLoggedIn() {
    this.isLoggedInUser = this._authService.isLoggedIn();
  }
}
