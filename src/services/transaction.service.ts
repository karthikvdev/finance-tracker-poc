import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ToastMessageComponent } from '../components/toast-message/toast-message.component';

export type API_RESPONSE<R = any> = {
  statusCode: number,
  status: "success" | "error",
  message: string,
  data: R
}


export interface ITransaction {
  title: string
  description: string;
  amount: number;
  date: Date;
  type: keyof typeof EITransactionType;
  transactionId: string
  category: string
}

export interface ITransactionsTotal{
  total: number,
  income: number,
  expenses: number
}

export enum EITransactionType {
  "Income" = "Income",
  "Expense" = "Expense"
}

export const CATEGORIES = [
  "Clothes & Fashion",
  "Gift",
  "Food & Beverage",
  "Music & Entertainment",
  "Finance",
  "Medical",
  "Groceries"
]


@Injectable({
  providedIn: 'root',
})

export class TransactionService {

  readonly regex = {
    whitespace: new RegExp(/(?!^$)([^\s])/)
  };

  constructor(
    private snackBar: MatSnackBar
  ) { }


  public transactionListSubject: BehaviorSubject<ITransaction[]> = new BehaviorSubject<ITransaction[]>(JSON.parse(localStorage?.getItem("transactions") || '[]'));

  public addTransaction(transaction: ITransaction): void {
    try {
      const transactions = [transaction, ...this.transactionListSubject?.value];
      this.transactionListSubject.next(transactions);
      localStorage?.setItem("transactions", JSON.stringify(this.sortTransaction(transactions) || []));
    } catch (error) {
      console.error(error);
    }
  }

  public editTransaction(transaction: ITransaction): void {
    try {
      const editedTransactionList = this.transactionListSubject?.value?.map((transactionData) => {
        if (transactionData?.transactionId === transaction?.transactionId) {
          return ({ ...transactionData, ...transaction });
        }
        else {
          return transactionData;
        }
      });
      this.transactionListSubject.next(editedTransactionList);
      localStorage?.setItem("transactions", JSON.stringify(this.sortTransaction(editedTransactionList) || []));
    } catch (error) {
      console.error(error);
    }
  }

  public deleteTransaction(transaction: ITransaction): void {
    try {
      const deleteTransactionList = this.transactionListSubject?.value?.filter((transactionData) => transactionData?.transactionId !== transaction?.transactionId);
      this.transactionListSubject.next(deleteTransactionList);
      localStorage?.setItem("transactions", JSON.stringify(this.sortTransaction(deleteTransactionList) || []));
    } catch (error) {
      console.error(error);
    }
  }

  public getAllTransactions(): ITransaction[] {
    return this.transactionListSubject?.value;
  }

  public getTransactionById(transactionId: string): ITransaction | undefined {
    return this.transactionListSubject?.value?.find((transaction) => transaction?.transactionId === transactionId);
  }

  public sortTransaction(transactionList: ITransaction[]): ITransaction[] {
    return transactionList?.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1)
  }

}
