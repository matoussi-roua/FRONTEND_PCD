import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private authService :AuthService,private route:Router){}
ngOnInit(): void {
  
}
logOut() {
  console.log("logout");
this.authService.logout().subscribe(
  (ch)=>{
    
    this.route.navigate(['/signin']);
  }
);
this.authService.clearLocalStorage();
}

}
