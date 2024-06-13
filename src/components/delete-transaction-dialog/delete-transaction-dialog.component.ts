import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProgressButtonComponent } from '../progress-button/progress-button.component';
import { ITransaction, TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-delete-transaction-dialog',
  standalone: true,
  imports: [
    ProgressButtonComponent
  ],
  templateUrl: './delete-transaction-dialog.component.html',
  styleUrl: './delete-transaction-dialog.component.scss'
})
export class DeleteTransactionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTransactionDialogComponent>,
    public transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: ITransaction
  ) { }

  public onDelete(): void {
    this.transactionService.deleteTransaction(this.data);
    this.dialogRef.close(true);
  }
  public onClose(): void {
    this.dialogRef.close();
  }

}
