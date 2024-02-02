import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { FormsModule } from '@angular/forms';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../categories'
import { NgFor } from '@angular/common';
import { Wallet } from '../wallet';


@Component({
  selector: 'app-update-balance',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './update-balance.component.html',
  styleUrl: './update-balance.component.css'
})

export class UpdateBalanceComponent implements OnInit {
  amount: number | null = null;
  operation: string = 'expense';
  categories: string[] = EXPENSE_CATEGORIES;
  selectedCategory: string = EXPENSE_CATEGORIES[0];
  walletId = '65b95ee3361ea42c00efc6b9'; 
  walletData: any | undefined

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletService.getWalletData(this.walletId)
    .subscribe((data: Wallet) => {
        this.walletData = data.wallet;
        this.sortCustomCategories()
      });
    
    }

  updateBalance(){
    this.walletService.updateBalance(this.walletId, this.amount, this.operation, this.selectedCategory)
      .subscribe()
      this.amount = 0
  }

  toggleIncome(){
    this.operation = 'income'
    this.categories = INCOME_CATEGORIES
    this.selectedCategory = INCOME_CATEGORIES[0] 
  }
  
  toggleExpense(){
    this.operation = 'expense'
    this.categories = EXPENSE_CATEGORIES
    this.selectedCategory = EXPENSE_CATEGORIES[0] 
  }

  sortCustomCategories(){
    this.walletData.customCategories.forEach((item: any) => {
      if(item.type === 'income'){
        INCOME_CATEGORIES.push(item.description)
        return
      }
        EXPENSE_CATEGORIES.push(item.description)      
    });
  }
}
