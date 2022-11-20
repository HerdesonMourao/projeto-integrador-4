import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[];

  user_id: number;
  closeResult: string;
  passwordChange: FormGroup;
  isNotEqual: boolean;

  role_types: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal,
    private formService: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.checkTypeRole();
    this.getAllUsers();

    this.passwordChange = this.formService.group({
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    })

  }

  getAllUsers(){
    let id = Number(localStorage.getItem('user_id'));

    this.userService.index(id).subscribe((data) => {
      this.users = data;
    })
  }

  onEdit(id){
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: number){
    console.log(id)
    Swal.fire({
      title: 'Deseja excluir esse registro?',
      text: "Essa operação é irreversível!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Deletar'
    }).then(result => {
      if(result.isConfirmed){
        this.userService.destroy(id).subscribe((data => {
          Swal.fire({
            title:data.message,
            icon:'success',
            confirmButtonColor: '#3085d6',
          }).then(result => {
            if(result.isConfirmed){
              window.location.reload()
            }
          })
        }))
      }
    })
  }

  filterUser(event: any){
    let {value} = event.target;
    let rows = document.querySelectorAll('#userTable tbody tr');

    rows.forEach(row => {
      const find = row.textContent.toLocaleLowerCase().includes(value);
      find ? row.classList.remove('hidden') : row.classList.add('hidden');
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openChangePassword(id, content){
    this.user_id = id;
    this.open(content);
    console.log(id)
  }

  updatePass(){
    if(this.passwordChange.valid && !this.isNotEqual){
      this.userService.updatePassword(this.user_id, this.passwordChange.value).subscribe(
        (res) => {
          this.toastr.success(
            "senha atualizada com sucesso!"
          );

          this.modalService.dismissAll();
          },
          (message) => {
          this.toastr.error(
            `${message.error.error}`
          )
        }
      )
    }else{
      this.toastr.error('Preencha todos os campos corretamente')
    }
  }

  isEqualPasswords(){
    if(this.passwordChange.value.confirmPassword != this.passwordChange.value.password){
      this.isNotEqual = true;
    }else{
      this.isNotEqual = false;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checkTypeRole(){
    let role = localStorage.getItem('level');

    if(role == "ADMIN"){
      this.role_types = false
    } else {
      this.role_types = true
    }
  }
}
