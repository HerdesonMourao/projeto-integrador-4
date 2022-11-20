import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  public userForm: FormGroup;

  context_name: string;
  context_username: string;
  context_password: string;
  context_whatsapp: string;
  context_email: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: new FormControl(null, Validators.compose([Validators.required])),
      username: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required])),
      avatar_logo: new FormControl(null),
      role: new FormControl('', Validators.compose([Validators.required])),
      whatsapp: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  register(){
    if(this.userForm.valid){
      this.userService.store(this.userForm.value).subscribe(
        (res) => {
          this.toastr.success(
            'Usuario cadastrado com sucesso!'
          );
          this.route.navigate(['user']);
        },
        (message) => {
          this.toastr.error(
            `${message.error.error}`
          )
        }
      )
    }else{
      this.toastr.error('Preencha todos os campos obrigatórios')
    }
  }

  blurValidationRequired(context){
    if(context == 'name'){
      if(this.userForm.value.name == null){
        this.context_name = context;
      }
    } else if(context == 'username'){
      if(this.userForm.value.username == null){
        this.context_username = context;
      }
    } else if(context == 'password'){
      if(this.userForm.value.password == null){
        this.context_password = context;
      }
    } else if(context == 'whatsapp'){
      if(this.userForm.value.whatsapp == null){
        this.context_whatsapp = context;
      }
    } else if(context == 'email'){
      if(this.userForm.value.email == null){
        this.context_email = context;
      }
    }
  }

  get name(){
    return this.userForm.get('name');
  }

  get username(){
    return this.userForm.get('username');
  }

  get password(){
    return this.userForm.get('password');
  }

  get whatsapp(){
    return this.userForm.get('whatsapp');
  }

  get email(){
    return this.userForm.get('email');
  }
}
