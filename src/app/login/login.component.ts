import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginFormGroup!: FormGroup;
  errorMessage: undefined;

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  handleLogin() {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    this.authService.login(username, password)
      .then(resp => {
        this.router.navigateByUrl("admin");
      }).catch(error => {
        this.errorMessage = error;
      });
  }
}
