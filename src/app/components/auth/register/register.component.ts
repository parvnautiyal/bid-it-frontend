import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Roles, User} from "../../../models/user";
import {HttpService} from "../../../services/http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm;
  errorMsg: string;
  len = "";

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm) {
    let username = registerForm.value.username;
    let password = registerForm.value.password;
    let name = registerForm.value.firstname + ' ' + registerForm.value.lastname;
    let email = registerForm.value.email;
    let contact = '+91 ' + registerForm.value.contact;
    let roles: Roles[] = [{
      roleDescription: 'This role provides standard user rights',
      roleName: 'ROLE_USER'
    }];
    let user = new User(username, password, name, email, contact, roles);
    this.httpService.registerUser(user).subscribe({
      next: res => {
        console.log(res);
        alert('Registration complete, please proceed to login.');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err);
        this.errorMsg = 'there was a problem registering user please try again.';
      }
    });
  }

  onReset() {
    this.registerForm.reset();
  }

}
