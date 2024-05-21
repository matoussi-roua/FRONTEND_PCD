import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserEntityDto } from '../models/user/user-entity-dto';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit{
leaderboard!:UserEntityDto[];
userId!:string;
constructor(private userService:UserService,private authService:AuthService){

}
ngOnInit(): void {
  this.userId=this.authService.getIdUser()!;
  this.userService.getLeaderBoard(this.userId).subscribe((response)=>{
    this.leaderboard=response.data;
    console.log(response, this.leaderboard);
  })
  
}
}
