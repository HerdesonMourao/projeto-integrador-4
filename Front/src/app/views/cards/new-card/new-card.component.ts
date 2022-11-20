import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardsService } from 'src/app/service/cards.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {
  public cardForm: FormGroup;

  context_card_number: string;
  context_flags: string;

  credit_type: boolean = true;

  constructor(
    private fb: FormBuilder,
    private cardService: CardsService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      card_number: new FormControl(null, Validators.compose([Validators.required])),
      type: new FormControl(''),
      flags: new FormControl(null, Validators.compose([Validators.required])),
      limit: new FormControl(null),
      current_value: new FormControl(null),
      closing_day: new FormControl(null)
    })
  }

  checkTypeCard(event){
    if(event.target.value == 'CREDIT'){
      this.credit_type = false;
    } else {
      this.credit_type = true;
    }
  }

  register(){
    this.cardForm.addControl('user_id', new FormControl(Number(localStorage.getItem('user_id'))));

    this.cardForm.patchValue({
      closing_day: Number(this.cardForm.value.closing_day)
    });

    if(this.cardForm.valid){
      this.cardService.store(this.cardForm.value).subscribe(
        (res) => {
          this.toastr.success(
            'Cartao cadastrada com sucesso!'
          );
          this.route.navigate(['card']);
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
    if(context == 'card_number'){
      if(this.cardForm.value.card_number == null){
        this.context_card_number = context;
      }
    } else if(context == 'flags'){
      if(this.cardForm.value.flags == null){
        this.context_flags = context;
      }
    }
  }

  get card_number(){
    return this.cardForm.get('card_number');
  }

  get flags(){
    return this.cardForm.get('flags');
  }
}
