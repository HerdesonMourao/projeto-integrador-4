import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private userService : UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login(){
    let { username, password } = this.loginForm.value;

    if(this.loginForm.valid){
      this.userService.acessSystem(username, password).subscribe((res: any) => {

        localStorage.setItem('user_id', res.id);
        localStorage.setItem('level', res.role);
        localStorage.setItem('st', 'LOGGED IN');

        this.router.navigate(['/']);
      })
    }
  }
}
