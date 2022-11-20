import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cards } from 'src/app/models/Cards';
import { CardsService } from 'src/app/service/cards.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: Cards[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cardService: CardsService
  ) { }

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards(){
    let id = Number(localStorage.getItem('user_id'));

    this.cardService.index(id).subscribe((data) => {
      this.cards = data;
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
        this.cardService.destroy(id).subscribe((data => {
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

  filterCard(event: any){
    let {value} = event.target;
    let rows = document.querySelectorAll('#cardTable tbody tr');

    rows.forEach(row => {
      const find = row.textContent.toLocaleLowerCase().includes(value);
      find ? row.classList.remove('hidden') : row.classList.add('hidden');
    });
  }
}
