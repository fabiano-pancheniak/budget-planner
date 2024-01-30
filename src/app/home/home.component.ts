import { Component, OnInit } from '@angular/core';
import { Wallet } from '../wallet';
import { WalletService } from '../wallet.service';
import { NgFor } from '@angular/common';

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
  last30DaysData: any[] = []

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    //const walletId = '65b3f059afdfe38db2b2bd42'; 
    const walletId = '29b4'; 
    this.walletService.getWalletData(walletId)
    .subscribe((data: Wallet) => {
      console.log(data)
        this.walletData = data;
        this.currentBalance = this.getBalance()
        this.getLast30DaysData()
      });
    
    }

  getTotalExpenses(){
    let totalExpenses: number = 0
    this.walletData.expenses.forEach((item: any) => {
      totalExpenses += item.amount
    });
    return totalExpenses
  }

  getTotalIncome(){
    let totalIncome: number = 0
    this.walletData.incomes.forEach((item: any) => {
      totalIncome += item.amount
    });
    return totalIncome
  }

  getLast30DaysData(){
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    this.walletData.incomes.forEach((item: any) => {
      if(item.date > thirtyDaysAgo.toISOString()){
        this.last30DaysData.push(item)
        console.log(this.last30DaysData)
      }
    });
  }

  getBalance(){
    const balance = (this.walletData.balance + this.getTotalIncome()) - this.getTotalExpenses() ;
    return balance
  }
}