import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { RegisterDto } from '../models/auth/register-dto';
import { AuthResponseDto } from '../models/auth/auth-response-dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
errorsfromback: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        signupemail: ['', [Validators.required]],
        signupfirstname: ['', [Validators.required]],
        signuplastname: ['', [Validators.required]],
        address: ['', [Validators.required]],
        phonenumber: ['', [Validators.required]],
        signuppassword: ['', [Validators.required]],
        // confirmpassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('signuppassword')?.value;
    const confirmPassword = group.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
  signUp() {
    if (!this.signupForm) {
      console.error('signupForm is not initialized.');
      return;
    }

    let newaccount: RegisterDto = {
      firstname: this.signupForm.get('signupfirstname')?.value,
      lastname: this.signupForm.get('signuplastname')?.value,
      username: this.signupForm.get('signupemail')?.value,
      phonenumber: this.signupForm.get('phonenumber')?.value,
      address: this.signupForm.get('address')?.value,
      password: this.signupForm.get('signuppassword')?.value,
    };
    console.log(newaccount);
    this.authService.register(newaccount).subscribe(
      (response: AuthResponseDto) => {
        // Handle successful registration
        const token: string = response.token;
        const userid: string = response.userEntity.id;
        // Store the token in local storage
        this.authService.setToken(token);
        this.authService.setIdUser(response.userEntity.id)
        this.authService.setRoleUser(response.userEntity.role.name)
        console.log('User registered successfully!');
        console.log(userid, this.authService.getToken());
        this.route.navigate(['/home'])
        // Redirect or show success message
      },
      (error) => {
        // Handle registration error
        console.error('Registration failed:', error);
        //methode 1 :
        // Directly log the 'errors' array to the console
        const serverErrors = error.error.errors;
        console.error('Errors:', serverErrors);
        this.errorsfromback=serverErrors;
        //methode 2 :
        // Log each error to the console
        serverErrors.forEach((errorMsg: string) => {
          console.error('Server Error:', errorMsg);
        });

        // Show error message or handle as needed
      }
    );
  }
}
