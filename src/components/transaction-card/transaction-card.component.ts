import { Component, Input } from '@angular/core';
import { EITransactionType, ITransaction, TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { ExpensesTypeIconComponent } from '../expenses-type-icon/expenses-type-icon.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTransactionFormComponent } from '../add-edit-transaction-form/add-edit-transaction-form.component';
import { DeleteTransactionDialogComponent } from '../delete-transaction-dialog/delete-transaction-dialog.component';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule,
    ExpensesTypeIconComponent
  ],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent {
  @Input() public transaction!: ITransaction;
  public EITransactionType = EITransactionType;
  constructor(
    public transactionService: TransactionService,
    public matDialog: MatDialog
  ) {

  }

  public handleOnEdit(): void {
    this.matDialog.open(AddEditTransactionFormComponent, {
      data: this.transaction,
      width: "50%"
    })
  }

  public handleOnDelete(): void {
    this.matDialog.open(DeleteTransactionDialogComponent, {
      data: this.transaction,
      width: "25%",
      height: "150px"
    })
  }

}
