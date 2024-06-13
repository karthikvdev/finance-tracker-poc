import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { ProgressButtonComponent } from '../progress-button/progress-button.component';
import { TransactionService, ITransaction, CATEGORIES } from '../../services/transaction.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-add-edit-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    ProgressButtonComponent,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-edit-transaction-form.component.html',
  styleUrl: './add-edit-transaction-form.component.scss'
})

export class AddEditTransactionFormComponent implements OnInit {

  public transactionForm!: FormGroup;
  public cancelBtnName: string = "Cancel";
  public defaultValue!: ITransaction;
  public formLoading: boolean = false;
  public transactionTypes: string[] = ["Expense", "Income"];
  public maxDate: Date = new Date();
  public categories = CATEGORIES;


  constructor(
    public formBuilder: FormBuilder,
    public transactionService: TransactionService,
    public dialogRef: MatDialogRef<AddEditTransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITransaction
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      title: new FormControl(this.data?.title || '', [Validators.required, Validators.pattern(this.transactionService?.regex.whitespace)]),
      amount: new FormControl(this.data?.amount || '', [Validators.required, Validators.pattern(this.transactionService?.regex.whitespace)]),
      date: new FormControl(this.data?.date || '', [Validators.required, Validators.pattern(this.transactionService?.regex?.whitespace)]),
      type: new FormControl(this.data?.type || '', [Validators.required, Validators.pattern(this.transactionService?.regex?.whitespace)]),
      category: new FormControl(this.data?.category || '', [Validators.required, Validators.pattern(this.transactionService?.regex?.whitespace)]),
      description: new FormControl(this.data?.description || '', [Validators.required, Validators.pattern(this.transactionService?.regex.whitespace)]),
    })
  }

  public save() {
    this.transactionForm?.markAllAsTouched();
    if (Object.values(this.transactionForm?.controls)?.every((field) => !field?.errors)) {
      this.formLoading = true;
      if (this.data == undefined) {
        const uuid = uuidv4();
        this.transactionService?.addTransaction({ transactionId: uuid, ...this.transactionForm.value });
      }
      else {
        this.transactionService.editTransaction({ transactionId: this?.data?.transactionId, ...this.transactionForm.value });
      }
      this.dialogRef.close();
    }
  }

  public cancelEdit(): void {
    this.dialogRef.close()
  }

}
