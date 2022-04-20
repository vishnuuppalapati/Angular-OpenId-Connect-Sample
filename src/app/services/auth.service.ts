import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(getClientSettings());
  private user: User | any ;
  currentUser = new Subject<boolean>();
  constructor(private router: Router) { 
    this.manager.getUser().then(user=>{
      this.user = user;
    })
  }
  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }
  getClaims(): any {
    return this.user;
  }
  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }
  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user=>{
      this.user = user;
      this.currentUser.next(true);
    })
  }
  Logout(): Promise<void> {
    return this.manager.signoutRedirect().then(resp=>{
      console.log(resp);
      if(resp == null)
      {
        this.router.navigate(['/login']);
      }
      
    })
  }

  
}

export function getClientSettings(): UserManagerSettings {
  return {
      authority: 'https://ensurity.ensurityzts.com/',
      client_id: 'angular_spa_psr1',
      client_secret:'fd543360-24ab-469d-ae85-34cb13685546',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: "id_token",
      scope: "openid profile email phone",
      filterProtocolClaims: true,
      loadUserInfo: false
  };
}
