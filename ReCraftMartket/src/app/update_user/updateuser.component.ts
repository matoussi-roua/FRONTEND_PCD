import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { UserEntity } from '../models/user/user_entity';
import { AuthService } from '../services/auth/auth-service.service';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';
import { FileUserService } from '../services/files/file-user.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// Custom validator to check if new password and confirm password match
@Component({
  selector: 'app-update',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
})
export class UpdateComponent implements OnInit {
  profileForm!: FormGroup;
  user: UserEntity = new UserEntity();
  currentUser!: UserEntity;
  userId: any;
  imageData!: SafeUrl;
  existedimage: boolean=true;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private fileUserService: FileUserService,
    private route:Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.initializeForm()
    // Fetch user data from backend by ID
    // const userId = this.authService.getCurrentUser().id;/*!!!!!!!!! */
    this.userId = this.authService.getIdUser();
    if (this.userId) {
      this.userService.getUserAuthorisedById(this.userId).subscribe((response) => {
        console.log(response.data);
        this.currentUser = response.data;
        this.updateForm();
        
      });
      
    }
    this.fetchImageData();
  }
  fetchImageData() {
    this.fileUserService.fetchImageFromUser(this.userId).subscribe((response)=>{
      console.log(response);
      this.imageData = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response));
      console.log(this.imageData);

    },(error) => {
      console.error('Error fetching image data:', error);
      this.existedimage=false;
      // Handle the error here, such as displaying an error message
    })

  }
  updateForm() {
    this.profileForm.patchValue({
      firstname: this.currentUser.firstname,
      phonenumber:this.currentUser.phonenumber,
      lastname: this.currentUser.lastname,
      address: this.currentUser.address,
      email: this.currentUser.username,
      
    });
  }
  initializeForm() {
    // Initialize the form with validators
    this.profileForm = this.formBuilder.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.username, [Validators.required, Validators.email]],
      phonenumber: [this.user.phonenumber,Validators.required],
      address: [this.user.address,Validators.required],
      newPassword: [''],
      confirmPassword: [''],
    }, { validators: this.passwordMatchValidator });
  }
   passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const newPassword = control.get('newPassword');
      const confirmPassword = control.get('confirmPassword');
    
      if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notSame: true });
        return { notSame: true };
      } else {
        confirmPassword?.setErrors(null);
        return null;
      }
    };
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
  
      this.fileUserService.addImageToUser(this.userId, file).subscribe(
        response => {
          console.log('Image uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    }

  /*updateProfile() {
    if (this.profileForm.valid) {
      // Perform update logic
      console.log('Profile updated successfully!');
      console.warn(this.profileForm.value);
    } else {
      console.log('Form is invalid. Please check your input.');
    }
  }*/

  

  /*promptForCurrentPassword() {
    const confirmed = confirm(
      'Please enter your current password before updating. Are you sure you want to proceed?'
    );
    if (confirmed) {
      this.updateProfile();
    } else {
      console.log('Update cancelled.');
    }
  }*/

  // changePassword() {
  //   if (
  //     this.profileForm.controls['oldPassword'].valid &&
  //     this.profileForm.controls['newPassword'].valid &&
  //     this.profileForm.controls['confirmPassword'].valid
  //   ) {
  //     console.log('Password changed successfully!');
  //   } else {
  //     console.log('Password form fields are invalid.');
  //   }
  // }

  // deleteProfile() {
  //   console.log('Profile deleted successfully!');
  // }
  onSubmit(){

    if (!this.profileForm) {
      console.error('profileForm is not initialized.');
      return;
    }
    
    console.log(this.profileForm.get('phonenumber')?.value);
    let user: UserEntity = {
      firstname: this.profileForm.get('firstname')?.value,
      lastname: this.profileForm.get('lastname')?.value,
      username: this.profileForm.get('email')?.value,
      phonenumber: this.profileForm.get('phonenumber')?.value,
      address: this.profileForm.get('address')?.value,
      password: this.profileForm.get('newPassword')?.value,
      points: this.currentUser.points,
      role: this.currentUser.role,
      id: this.currentUser.id
    };
    console.log('First Name:', this.profileForm.get('firstname')?.value);
console.log('Last Name:', this.profileForm.get('lastname')?.value);
console.log('Email:', this.profileForm.get('email')?.value);
console.log('Phone Number:', this.profileForm.get('phonenumber')?.value);
console.log('Address:', this.profileForm.get('address')?.value);
console.log('New Password:', this.profileForm.get('newPassword')?.value);
// this.fileUserService.addImageToUser(this.userId,).subscribe(
//   ()=>{}
// );
    this.userService.updateUser(user.id,user).subscribe(
      () => {
       console.log(user.phonenumber);
        console.log('User logged successfully!');
        // Redirect or show success message
      },
      (error) => {
        // Handle login error
        console.error('Update failed:', error);
        //methode 1 :
        // Directly log the 'errors' array to the console
        const serverErrors = error.error.errors;
        console.error('Errors:', serverErrors);
        //methode 2 :
        // Log each error to the console
        serverErrors.forEach((errorMsg: string) => {
          console.error('Server Error:', errorMsg);
        });}
    )
    console.log();

  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
// import { AbstractControl } from '@angular/forms';

// import { UsersService } from '../services/users.service';
// import { UserEntity } from '../models/user/user_entity';
// import { AuthService } from '../services/auth/auth-service.service';

// export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const newPassword = control.get('newPassword');
//   const confirmPassword = control.get('confirmPassword');

//   if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
//     confirmPassword.setErrors({ notSame: true });
//     return { notSame: true };
//   } else {
//     confirmPassword?.setErrors(null);
//     return null;
//   }
// };

// @Component({
//   selector: 'app-update',
//   templateUrl: './updateuser.component.html',
//   styleUrls: ['./updateuser.component.css']
// })
// export class UpdateComponent implements OnInit {
//   profileForm!: FormGroup;
//   user: UserEntity = new UserEntity();

//   constructor(private formBuilder: FormBuilder, private userService: UsersService, private authService: AuthService ) {}
// ngOnInit() {

//    const userId ='1';
//    this.userService.getUserById(userId).subscribe((userData: UserEntity) => {
//       this.user = userData;
//       this.initializeForm();
//     });
//   }
//   initializeForm() {

//     this.profileForm = this.formBuilder.group({
//       firstName: [this.user.firstname, Validators.required],
//       lastName: [this.user.lastname, Validators.required],
//       email: [this.user.username, [Validators.required, Validators.email]],
//       phoneNumber: [this.user.phonenumber, [Validators.required, Validators.pattern(/^\d{8}$/)]],
//       address: [this.user.address],
//       oldPassword: ['', Validators.required],
//       newPassword: ['', Validators.minLength(6)],
//       confirmPassword: ['']
//     }, { validators: passwordMatchValidator });
//   }

//   updateProfile() {
//     if (this.profileForm.valid) {

//       console.log('Profile updated successfully!');
//       console.warn(this.profileForm.value);
//     } else {
//       console.log('Form is invalid. Please check your input.');
//     }
//   }

//   promptForCurrentPassword() {
//     const confirmed = confirm('Please enter your current password before updating. Are you sure you want to proceed?');
//     if (confirmed) {
//       this.updateProfile();
//     } else {
//       console.log('Update cancelled.');
//     }
//   }

//   changePassword() {
//     if (this.profileForm.controls['oldPassword'].valid &&
//         this.profileForm.controls['newPassword'].valid &&
//         this.profileForm.controls['confirmPassword'].valid) {
//       console.log('Password changed successfully!');
//     } else {
//       console.log('Password form fields are invalid.');
//     }
//   }

//   deleteProfile() {
//     console.log('Profile deleted successfully!');
//   }
// }
