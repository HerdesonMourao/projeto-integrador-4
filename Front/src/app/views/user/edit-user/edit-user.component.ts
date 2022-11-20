import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public userForm: FormGroup;

  context_name: string;
  context_username: string;
  //context_password: string;
  context_whatsapp: string;
  context_email: string;

  user: User;
  idParams: number;
  idClient: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(){
    this.idClient = this.route.params.subscribe((params: any) => {
      this.idParams = Number(params['id']);
    })

    this.populateForm();
    this.initForm();
  }

  populateForm(){
    this.userService.show(this.idParams).subscribe((data) => {
      this.user = data;
      this.updateForm(data);
    })
  }

  updateForm(data){
    this.userForm.patchValue({
      name: data.name,
      username: data.username,
      //password: data.password,
      avatar_logo: data.avatar_logo,
      role: data.role,
      whatsapp: data.whatsapp,
      email: data.email,
    });
  }

  initForm(){
    this.userForm = this.fb.group({
      name: new FormControl(null, Validators.compose([Validators.required])),
      username: new FormControl(null, Validators.compose([Validators.required])),
      //password: new FormControl(null, Validators.compose([Validators.required])),
      role: new FormControl(''),
      avatar_logo: new FormControl(null),
      whatsapp: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  register(){
    if(this.userForm.valid){
      this.userService.update(this.userForm.value, this.idParams).subscribe(
        (dados) => {
          this.toastr.success(`${dados.message}`);
          this.router.navigate(['user'])
        },
        (error) => {
          this.toastr.error(`${error.message}`);
        }
      )
    } else {
      this.toastr.error('Dados do formulário inválido');
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
    // } else if(context == 'password'){
    //   if(this.userForm.value.password == null){
    //     this.context_password = context;
    //   }
    //
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

  // get password(){
  //   return this.userForm.get('password');
  // }

  get whatsapp(){
    return this.userForm.get('whatsapp');
  }

  get email(){
    return this.userForm.get('email');
  }
}
