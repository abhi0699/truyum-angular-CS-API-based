import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  CartError: boolean;
  LoginError: boolean;

  constructor(private authService: AuthService, private route: Router, private cartError?: ActivatedRoute) { 
    this.user = new User();
    this.CartError = false;
      if(cartError.snapshot.paramMap.get('cartError')=='carterror'){
        this.CartError = true;
      }
  }

  login(loginForm: NgForm){
    this.authService.authenticateUser(this.user).subscribe(
      res=>{
        this.authService.loggedUser = res;
        this.authService.saveUserDetails();
        this.tryLogin();
      },
      err =>{ console.log(err); this.LoginError = true;}
    );
  }

  ngOnInit(): void {
  }

  tryLogin(){
    if (this.authService.loggedUser != undefined) {
      this.route.navigateByUrl('/menu-item-list');
    }
  }

}
