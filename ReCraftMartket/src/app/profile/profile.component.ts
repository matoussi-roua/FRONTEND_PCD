import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { FileUserService } from '../services/files/file-user.service';

import { Observable } from 'rxjs';
import { UserEntityDto } from '../models/user/user-entity-dto';
import { UserService } from '../services/user/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  imageData!:  SafeUrl;
  existedimage:boolean=true;
  currentUser!:UserEntityDto;
  constructor(private fileUserService: FileUserService,private authService:AuthService,private userService:UserService
    ,private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getIdUser();
    if (userId) {
    this.userService.getUserById(userId).subscribe(
      (response)=>{
        console.log(response.data);
        this.currentUser=response.data;

        
      }
    );
    this.fetchImageData(userId);}

  }

  fetchImageData(userId: string) {
    this.fileUserService.fetchImageFromUser(userId).subscribe((response)=>{
      console.log(response);
      this.imageData = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response));
    },(error) => {
      console.error('Error fetching image data:', error);
      this.existedimage=false;
      // Handle the error here, such as displaying an error message
    })

  }
}