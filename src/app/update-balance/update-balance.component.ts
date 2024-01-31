import { Component } from '@angular/core';
import { WalletService } from '../wallet.service';
import { FormsModule } from '@angular/forms';
import { CATEGORIES } from '../categories'
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-update-balance',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './update-balance.component.html',
  styleUrl: './update-balance.component.css'
})
export class UpdateBalanceComponent {
  amount: number | null = null;
  operation: string = 'income';
  categories: string[] = CATEGORIES;
  selectedOption: string = '';
  walletId = '65b3f059afdfe38db2b2bd42'; 

  constructor(private walletService: WalletService) { }

  updateBalance(){
    this.walletService.updateBalance(this.walletId, this.amount, this.operation)
      .subscribe()
      this.amount = 0
  }

  toggleIncome(){
    this.operation = 'income'
  }
  
  toggleExpense(){
    this.operation = 'expense'
  }
}
