import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth/auth-service.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    // Define URLs that should be excluded from adding Authorization header
    const excludedUrls = ['/api/v1/auth/register', '/api/v1/auth/login','/api/v2/users/permit','/api/v3/products/permit']; // Add more if needed
    // Check if the request URL is in the excludedUrls list
    if (token && !excludedUrls.some(url => req.url.includes(url))) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
  
      return next.handle(req);
    }
}


    
    

    
