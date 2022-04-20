import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response: any;
  constructor(private authService:AuthService, private http: HttpClient) { }

  public _userProfile: any;
  ngOnInit() {
    this.getAllUsers();
  }
  
  getAllUsers()
  {
    this._userProfile = JSON.stringify(this.authService.getClaims());
    let data = JSON.parse(this._userProfile);
    let idToken = data.id_token;
    this.getTransferIp(idToken).subscribe((resp:any)=>{

      this.response = JSON.stringify(resp);
    });
  }
  getTransferIp(token:string):  Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization", token);

    return this.http.get("https://ensurity.ensurityzts.com/api/dashboard/GetLoginAnalyticsData", {headers:header}).pipe(
      map(resp => {
        return resp;
      })
    );
  }
}
