import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OpenidPasswordFlow';
  currentUser: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(x=> this.currentUser = x);
  }
  ngOnInit() {
    
  }
  logout()
  {
    this.authService.Logout();
    this.currentUser=false;
    //this.router.navigate(['/login']);
  }
}
