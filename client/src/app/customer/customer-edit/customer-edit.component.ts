import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../model/Customer';
import { CustomerService } from '../customer.service';



@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit  {

  customer : Customer;
  nameExists : Boolean;
  errorMessage : string;

  constructor(
    public dialogRef: MatDialogRef<CustomerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    if (this.data.customer != null) {
      this.customer = Object.assign({}, this.data.customer);
    }
    else {
      this.customer= new Customer();
    }
    
  }
  
  checkIfNameExists():void {
    this.customerService.getCustomers().subscribe(customers => {
      this.nameExists = customers.some(e => e.name.toLowerCase() === this.customer.name.trim().toLowerCase());

    });
  }

  onSave() {
    this.checkIfNameExists();
    if(this.nameExists){
      this.errorMessage="¡El nombre ya existe, elije otro!";
      return;
    }
    this.customerService.saveCustomer(this.customer).subscribe(result => {
    this.dialogRef.close();
     });
    

  } 

  onClose() {
    this.dialogRef.close();
  }

}
