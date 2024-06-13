import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CATEGORIES, EITransactionType, ITransaction } from '../../services/transaction.service';

@Component({
  selector: 'app-expenses-type-icon',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './expenses-type-icon.component.html',
  styleUrl: './expenses-type-icon.component.scss'
})
export class ExpensesTypeIconComponent {
  @Input() transaction!: ITransaction
  public CATEGORIES = CATEGORIES;
  public EITransactionType = EITransactionType;
}
