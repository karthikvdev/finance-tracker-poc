import { Component } from '@angular/core';
import { EITransactionType, ITransaction, ITransactionsTotal, TransactionService } from '../../services/transaction.service';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { ProgressButtonComponent } from '../progress-button/progress-button.component';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTransactionFormComponent } from '../add-edit-transaction-form/add-edit-transaction-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    TransactionCardComponent,
    ProgressButtonComponent,
    CommonModule

  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {

  public transactions: ITransaction[] = [];
  public EITransactionType = EITransactionType;
  public transactionInfo: ITransactionsTotal = { total: 0, income: 0, expenses: 0 }
  constructor(
    public transactionService: TransactionService,
    public matDialog: MatDialog
  ) {
    this.transactionService.transactionListSubject.subscribe((transactions) => {
      this.transactions = transactions;
      this.handleOnTransactionDetails(transactions);
    })
  }

  public handleOnAddTransaction(): void {
    this.matDialog.open(AddEditTransactionFormComponent, {
      width: "50%",
      disableClose: true
    })
  }

  public handleOnTransactionDetails(transactions: ITransaction[]): void {
    console.log("transactions", transactions)
    this.transactionInfo = transactions?.reduce((acc, val): any => {
      console.log("acc", acc)
      console.log("val", val);

      return ({
        total: val?.type === this.EITransactionType.Income ? (acc.total + val?.amount) : (acc.total - val?.amount),
        income: (acc.income || 0) + (val?.type === this.EITransactionType.Income ? val.amount : 0),
        expenses: acc.expenses + (val?.type === this.EITransactionType.Expense ? val.amount : 0)
      })

    }, { total: 0, income: 0, expenses: 0 })
  }

}
