import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardproductComponent } from './cardproduct/cardproduct.component';
import { ChatComponent } from './chat/chat.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TopcustomerComponent } from './topcustomer/topcustomer.component';
import { DetailsComponent } from './details/details.component';
import { CommentsComponent } from './comments/comments.component';
import { LogComponent } from './login/log.component';
import { AddproductComponent } from './addproduct/addproduct.component';
//import { ModelsComponent } from './models/models.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
/*login */
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import{MatInputModule} from '@angular/material/input';
import{ReactiveFormsModule} from '@angular/forms';

import { UpdateComponent } from './update_user/updateuser.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HomeComponent } from './home/home.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth-service.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
/*login */
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    LeaderboardComponent,
    DashboardComponent,
    CardproductComponent,
    ChatComponent,
    NotfoundComponent,
    TopcustomerComponent,
    DetailsComponent,
    CommentsComponent,
    LogComponent,
    AddproductComponent,

    UpdateComponent,
    HomeComponent,
    Navbar2Component,
    AboutComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    ShoppingListComponent
   // ModelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
     MatCardModule,
     MatButtonModule,
     MatInputModule,
     ReactiveFormsModule,
      MatDialogModule,
     MatIconModule,
     HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthService,
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



/*Import HttpClientModule in AppModule.
Provide _AuthService in either AppModule or a specific component/module.
Make sure _AuthService properly imports HttpClient.*/