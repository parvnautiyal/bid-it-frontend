import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userSub: Subscription;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.tokenService.user.subscribe({
      next: res => {
        this.isAuthenticated = res;
      }
    });
    if (sessionStorage.getItem('user')) {
      this.isAuthenticated = true;
    }
  }

  logout() {
    this.tokenService.clearSession();
    this.router.navigate(['/login']);
  }

  log() {
    console.log(sessionStorage.getItem('user'));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
