import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { MustMatch } from './validation/passwordvalidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router) { 
    this.user = new User();
    this.signUpForm = this.fb.group({
      userName: new FormControl('',[Validators.required, Validators.minLength(6)]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      cnfPassword: new FormControl('',[Validators.required])
    },{
      validator: MustMatch('password','cnfPassword')
    });
  }

  get SignUpForm() {
    return this.signUpForm.controls;
  }

  createUser(newUser: FormGroup): void{
    this.user.userName = newUser.controls['userName'].value;
    this.user.firstName = newUser.controls['firstName'].value;
    this.user.lastName = newUser.controls['lastName'].value;
    this.user.password = newUser.controls['password'].value;
    this.user.admin = false;
    this.signUp(this.user);
  }

  ngOnInit(): void {
  }

  signUp(newUser: User){
    this.userService.addUser(newUser).subscribe(
      response => this.route.navigateByUrl('/login'),
      err => console.log(err)
    );
  }

}
