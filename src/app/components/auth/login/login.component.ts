import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm;
  errorMsg: string;

  constructor(private httpService: HttpService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    console.log('clicked');
    this.httpService.login(loginForm.value.username, loginForm.value.password).subscribe({
      next: res => {
        console.log(res);
        let response = res.body;
        this.tokenService.setAccessToken(response['accessToken']);
        this.tokenService.setRefreshToken(response['refreshToken']);
        this.tokenService.setUser(response['userId'], response['userName']);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.log(err);
        if (err.status === 401)
          this.errorMsg = 'Invalid Credentials';
        else
          this.errorMsg = 'Something went wrong';
        this.loginForm.reset();
      }
    });
  }

  onReset() {
    this.errorMsg = undefined;
    this.loginForm.reset();
  }

  log() {
    console.log(sessionStorage.getItem('user'));
  }
}
