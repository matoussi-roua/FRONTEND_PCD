import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { LoginDto } from '../models/auth/login-dto';
import { AuthResponseDto } from '../models/auth/auth-response-dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  LoginForm!: FormGroup;
errorsfromback: any;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      loginusername: ['', [Validators.required]],
      loginpassword: ['', [Validators.required,]]
    });
  }
  
  signIn(){
    if (!this.LoginForm) {
      console.error('loginForm is not initialized.');
      return;
    }

    let loginaccount: LoginDto = {
      username: this.LoginForm.get("loginusername")?.value,
      password: this.LoginForm.get("loginpassword")?.value
    };
    this.authService.login(loginaccount).subscribe(
      (response: AuthResponseDto) => {
        // Handle successful login
        // Extract the token string from the response
        const tokenString = response.token;
        // Create a Token object and store it in local storage
        this.authService.setToken(tokenString);
        this.authService.setIdUser(response.userEntity.id)
        this.authService.setRoleUser(response.userEntity.role.name)
        //localStorage.setItem(this.iduser, response.userEntity.id);
       // localStorage.setItem(this.roleuser, response.userEntity.role.name);
        console.log('User logged successfully!');
        console.log(response.userEntity.id,response.userEntity.role.name,this.authService.getToken());
        this.route.navigate(['/home'])
        // Redirect or show success message
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
        //methode 1 :
        // Directly log the 'errors' array to the console
        const serverErrors = error.error.errors;
        this.errorsfromback=serverErrors;
        console.error('Errors:', serverErrors);
        //methode 2 :
        // Log each error to the console
        serverErrors.forEach((errorMsg: string) => {
          console.error('Server Error:', errorMsg);
        });}
    )
    console.log(loginaccount);

  }
}
