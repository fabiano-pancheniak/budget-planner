import { Component, OnInit } from '@angular/core';
import { Wallet } from '../wallet';
import { WalletService } from '../wallet.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  walletData: any | undefined;
  currentBalance: number = 0;
  monthlyData: any[] = []

  constructor(private walletService: WalletService, private router: Router) { }

  ngOnInit(): void {
    const walletId = '65b95ee3361ea42c00efc6b9'; 
    //const walletId = 'af47'; 
    this.walletService.getWalletData(walletId)
    .subscribe((data: Wallet) => {
        this.walletData = data.wallet;
        console.log(this.walletData)
        this.currentBalance = this.getBalance()
      });
    
    }

  getOperationsTotals(){
    let operationsBalance: number = 0
    this.walletData.operations.forEach((item: any) => {
      if(item.type === 'expense'){
        operationsBalance -= item.amount
        return
      }
      operationsBalance += item.amount
    })
    return operationsBalance
  }

  //revisar
  getMonthlyData(){
    this.walletData.incomes.forEach((item: any) => {
      const currentDate = new Date(item.date)
      if(currentDate.getMonth() == new Date().getMonth()){
        this.monthlyData.push(item)
      }
    });
  }

  getBalance(){
    const balance = this.walletData.balance + this.getOperationsTotals();
    console.log(balance)
    return balance
  }

  updateBalance() {
    this.router.navigate(['/balance']);
  }
  /*
    getLast30DaysData(){
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      this.walletData.incomes.forEach((item: any) => {
        if(item.date > thirtyDaysAgo.toISOString()){
          //this.last30DaysData.push(item)
        }
      });
    }
  */
}