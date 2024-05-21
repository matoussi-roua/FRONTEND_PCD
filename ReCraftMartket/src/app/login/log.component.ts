/*import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



import { Users } from '../models/users';
declare var $: any;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'

})

export class LogComponent implements OnInit {
  signupUsers:any[]=[];
  signupObj:any={
    username:'',
    adress:'',
    phonenumber:'',
    password:'',
    confirmpassword:''


  };
   LoginObj:any={
    username:'',
    password:''


  };
  constructor() { }

  ngOnInit(): void {

    const localData=localStorage.getItem('signUpUsers');
    if (localData!=null){this.signupUsers=JSON.parse(localData);

    }
    // JavaScript logic here
    $('#signup').click(function() {
      $('.pinkbox').css('transform', 'translateX(80%)');
      $('.signin').addClass('nodisplay');
      $('.signup').removeClass('nodisplay');
    });

    $('#signin').click(function() {
      $('.pinkbox').css('transform', 'translateX(0%)');
      $('.signup').addClass('nodisplay');
      $('.signin').removeClass('nodisplay');
    });

 }
    onSignUp(){
      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));

        this.signupObj ={
    username:'',
    adress:'',

    phonenumber:'',
    password:'',
    confirmpassword:''

  };
    }
    onLogin(){
      debugger
      const isUserExist=this.signupUsers.find(m => m.username == this.LoginObj.username && m.password == this.LoginObj.password);
if (isUserExist !=undefined){

  alert('User LoginSuccessfully');

}else{alert('Wrong credentials');}
    }

}
*/
/*2eme version
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
   signupForm: FormGroup = new FormGroup({});
  signupUsers: any[] = [];//utilisateurs inscrits
  signupObj: any = { //stockage temporaire
    username: '',
    address: '',
    phonenumber: '',
    password: '',
    confirmpassword: ''
  };
  LoginObj: any = {
    username: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the signup form with form controls and validators
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    });

    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }


    $('#signup').click(function () {
      $('.pinkbox').css('transform', 'translateX(80%)');
      $('.signin').addClass('nodisplay');
      $('.signup').removeClass('nodisplay');
    });

    $('#signin').click(function () {
      $('.pinkbox').css('transform', 'translateX(0%)');
      $('.signup').addClass('nodisplay');
      $('.signin').removeClass('nodisplay');
    });
  }

  onSignUp() {

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();
      return;
    }


    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));

    this.signupObj = {
      username: '',
      address: '',
      phonenumber: '',
      password: '',
      confirmpassword: ''
    };
  }

  onLogin() {
    debugger;
    const isUserExist = this.signupUsers.find(m => m.username == this.LoginObj.username && m.password == this.LoginObj.password);
    if (isUserExist != undefined) {
      alert('User Login Successfully');
    } else {
      alert('Wrong credentials');
    }
  }
}*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserEntity } from '../models/user/user_entity';
import { RegisterDto } from '../models/auth/register-dto';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { LoginDto } from '../models/auth/login-dto';
import { Token } from '../models/token/token';
import { AuthResponseDto } from '../models/auth/auth-response-dto';
import { UserEntityDto } from '../models/user/user-entity-dto';

declare var $: any;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
  providers: [AuthService] // Provide AuthService here

})

export class LogComponent implements OnInit {
  SignupForm!: FormGroup;
  LoginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    // jQuery code
    $('#signup').click(function() {
      $('.pinkbox').css('transform', 'translateX(80%)');
      $('.signin').addClass('nodisplay');
      $('.signup').removeClass('nodisplay');
    });

    $('#signin').click(function() {
      $('.pinkbox').css('transform', 'translateX(0%)');
      $('.signup').addClass('nodisplay');
      $('.signin').removeClass('nodisplay');
    });

    this.LoginForm = this.fb.group({
      loginusername: ['', [Validators.required]],
      loginpassword: ['', [Validators.required,]]
    });

    this.SignupForm = this.fb.group({
      signupemail: ['', [Validators.required]],
      signupfirstname: ['', [Validators.required]],
      signuplastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      signuppassword: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('signuppassword')?.value;
    const confirmPassword = group.get('confirmpassword')?.value;
  
    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  LoginUser(): void {
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
        console.log('User logged successfully!');
        console.log(this.authService.getToken());
        // Redirect or show success message
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
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
    console.log(loginaccount);

  }

  SignupUser(): void {
    if (!this.SignupForm) {
      console.error('SignupForm is not initialized.');
      return;
    }

    let newaccount: RegisterDto = {
      firstname: this.SignupForm.get("signupfirstname")?.value,
      lastname: this.SignupForm.get("signuplastname")?.value,
      username: this.SignupForm.get("signupemail")?.value,
      phonenumber: this.SignupForm.get("phonenumber")?.value,
      address: this.SignupForm.get("address")?.value,
      password: this.SignupForm.get("signuppassword")?.value
    };
    console.log(newaccount);
    this.authService.register(newaccount).subscribe(
      (response: AuthResponseDto) => {
        // Handle successful registration
        const token: string = response.token;
        const userid:string=response.userEntity.id;
        // Store the token in local storage
        this.authService.setToken(token);
        console.log('User registered successfully!');
        console.log(userid,this.authService.getToken());
        // Redirect or show success message
      },
      (error) => {
        // Handle registration error
        console.error('Registration failed:', error);
        //methode 1 :
        // Directly log the 'errors' array to the console
        const serverErrors = error.error.errors;
        console.error('Errors:', serverErrors);
        //methode 2 :
        // Log each error to the console
        serverErrors.forEach((errorMsg: string) => {
          console.error('Server Error:', errorMsg);
        });
    
      // Show error message or handle as needed
  }
    );
    }
    //console.warn(this.SignupForm.value);

  //   this.authService.(newaccount).subscribe(
  //     () => {
  //       console.log('User registered successfully');
  //       // Redirect or show success message
  //     },
  //     (error) => {
  //       console.error('Error registering user:', error);
  //       // Handle error, show error message
  //     }
  //   );
  // }

}
  // get signupfirstname ()
  // {
  //   return this.SignupForm.get('signupfirstname');
  // }
  // get signuplastname ()
  // {
  //   return this.SignupForm.get('signuplastname');
  // }
  // get signupemail ()
  // {
  //   return this.SignupForm.get('signupemail');
  // }
  //  get signupphonenumber ()
  //  {
  //   return this.SignupForm.get('phonenumber');
  // }
  //   get signupaddress ()
  //  {
  //   return this.SignupForm.get('address');
  // }
  //  get signuppassword ()
  //  {
  //   return this.SignupForm.get('signuppassword');
  // }
  //  get signupconf_password ()
  //  {
  //   return this.SignupForm.get('confirmpassword');
  // }

/*export class AdduserComponent implements OnInit {
  adduserform!: FormGroup;

  constructor(private fb: FormBuilder, private usersrv: UsersService, private route: Router) {

  }
  ngOnInit(): void {
    this.adduserform = this.fb.group({
      newlname: ['', Validators.required],
      newemail: ['', [Validators.required, Validators.email]],
      newpassword: ['', Validators.required],
      newfname: ['', Validators.required],
      newrole: ['', Validators.required],
      newcity: ['', Validators.required],
      newcountry: ['', Validators.required],
      newpostcode: ['', Validators.required],
      newphone: ['', Validators.required]
    });


  }
  OnAdd() {
    let useradded: Users = new Users();
    useradded.firstName = this.adduserform.get("newfname")?.value;
    useradded.lastName = this.adduserform.get("newlname")?.value;
    useradded.role = this.adduserform.get("newrole")?.value;
    useradded.city = this.adduserform.get("newcity")?.value;
    useradded.country = this.adduserform.get("newcountry")?.value;
    useradded.postCode = this.adduserform.get("newpostcode")?.value;
    useradded.phone = this.adduserform.get("newphone")?.value;
    useradded.email = this.adduserform.get("newemail")?.value;
    useradded.password = this.adduserform.get("newpassword")?.value;

    this.usersrv.addUser(useradded).subscribe(
      () => {
        console.log('User added successfully');
        this.route.navigate(['/usersforadmin']);
      }
    );
  }

}*/ 




