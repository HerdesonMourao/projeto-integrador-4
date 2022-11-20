import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cards } from 'src/app/models/Cards';
import { CardsService } from 'src/app/service/cards.service';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {
  public cardForm: FormGroup;

  context_card_number: string;
  context_flags: string;

  card: Cards;
  idParams: number;
  idClient: Subscription;
  credit_type: boolean = true;

  constructor(
    private fb: FormBuilder,
    private cardService: CardsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.idClient = this.route.params.subscribe((params: any) => {
      this.idParams = Number(params['id']);
    })

    this.populateForm();
    this.initForm();
  }

  populateForm(){
    this.cardService.show(this.idParams).subscribe((data) => {
      this.card = data;
      this.updateForm(data);
    })
  }

  updateForm(data){
    this.cardForm.patchValue({
      card_number: data.card_number,
      type: data.type,
      flags: data.flags,
      limit: data.limit,
      current_value: data.current_value,
      closing_day: data.closing_day
    })

    if(data.type == `CREDIT`){
      this.credit_type = false
    }
  }

  initForm(){
    this.cardForm = this.fb.group({
      card_number: new FormControl(null, Validators.compose([Validators.required])),
      type: new FormControl(''),
      flags: new FormControl(null, Validators.compose([Validators.required])),
      limit: new FormControl(null),
      current_value: new FormControl(null),
      closing_day: new FormControl(null)
    });
  }

  checkTypeCard(event){
    if(event.target.value == 'CREDIT'){
      this.credit_type = false;
    } else {
      this.credit_type = true;
    }
  }

  register(){
    this.cardForm.patchValue({
      closing_day: Number(this.cardForm.value.closing_day)
    });

    if(this.cardForm.valid){
      this.cardService.update(this.cardForm.value, this.idParams).subscribe(
        (dados) => {
          this.toastr.success(`${dados.message}`);
          this.router.navigate(['card']);
        },
        (error) => {
          this.toastr.error(
            `${error.message}`
          )
        }
      )
    }else{
      this.toastr.error('Dados do formulário inválido');
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
