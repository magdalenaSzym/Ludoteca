import { Component, Inject, OnInit } from '@angular/core';
import { Borrow } from '../model/Borrow';
import { CustomerService } from 'src/app/customer/customer.service';
import { GameService } from 'src/app/game/game.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BorrowService } from '../borrow.service';
import { Game } from 'src/app/game/model/Game';
import { Customer } from 'src/app/customer/model/Customer';


@Component({
  selector: 'app-borrow-edit',
  templateUrl: './borrow-edit.component.html',
  styleUrls: ['./borrow-edit.component.scss']
})
export class BorrowEditComponent implements OnInit {

  borrow: Borrow;
  games: Game[]; 
  customers: Customer[];

  //error: boolean = true;
  errorMessage: String ;


  constructor(
      public dialogRef: MatDialogRef<BorrowEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialog: MatDialog,
      private gameService: GameService,
      private customerService: CustomerService,
      private borrowService: BorrowService,
     
      
  ) { }

  ngOnInit(): void {
      if (this.data.borrow != null) {
          this.borrow = Object.assign({}, this.data.borrow);
      }
      else {
          this.borrow = new Borrow();
      }

      this.gameService.getGames().subscribe(
        games => { this.games = games }
      )
  
      this.customerService.getCustomers().subscribe(
        customers => { this.customers = customers }
      );
  
   
  }

  onSave() {
/* Al final lo válido desde SpringBoot
    if(!this.isBorrowDurationValid()){
      alert("El período máximo de préstamo es de 14 días")
    }

    if(!this.isBorrowDateValid()){
      alert("Fecha inválida: La fecha de fin no puede ser anterior a la de inicio");
    }
   */
    this.borrowService.saveBorrow(this.borrow).subscribe({
      next: (result) => {
        this.dialogRef.close();
      },
      error: (error) => {
        this.errorMessage = error.error.message
       alert ('Error al guardar préstamo: '+ this.errorMessage)
      
      }
    });
          
  }  

  isBorrowDurationValid():boolean {
    const startDate = new Date(this.borrow.startDate);
    const finishDate = new Date(this.borrow.finishDate);
    const daysBetween = (finishDate.getTime() - startDate.getTime()) / (1000 * 60 *60 *24);

    return daysBetween <=14;
  }

  isBorrowDateValid(): boolean{
    const startDate = new Date(this.borrow.startDate);
    const finishDate = new Date(this.borrow.finishDate);

    if(finishDate < startDate){
      return false;
    }
    return true;
  }

  onClose() {
      this.dialogRef.close();
  }



}


