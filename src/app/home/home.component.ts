import { Component, OnInit } from '@angular/core';
import { Wallet } from '../wallet';
import { WalletService } from '../wallet.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NgFor, NgIf]
})

export class HomeComponent implements OnInit {
  walletData: any | undefined;
  monthBalance = 0
  monthlyOperations: any[] = []
  percentage: string = ''

  constructor(private walletService: WalletService, private router: Router) { }

  ngOnInit(): void {
    const walletId = '65b95ee3361ea42c00efc6b9'; 
    
      this.walletService.getWalletData(walletId)
      .subscribe((data: Wallet) => {
          console.log(data)
          this.walletData = data.wallet;
          this.monthBalance = this.getMonthlyOperationsTotals()
          this.monthlyOperations = this.getMonthlyData()
          this.percentage = this.getPercentage(this.monthBalance, this.walletData.balance)
        });
    
    }

  getMonthlyOperationsTotals(){
    let operationsBalance: number = 0
    let monthlyData = this.getMonthlyData()
    monthlyData.forEach((item: any) => {
      if(item.type === 'expense'){
        operationsBalance -= item.amount
        return
      }
      operationsBalance += item.amount
    })
    return operationsBalance
  }

  getMonthlyData(){
    let monthlyData: Object[] = []
    this.walletData.operations.forEach((item: any) => {
      const currentDate = new Date(item.date)
      if(currentDate.getFullYear() == new Date().getFullYear() && currentDate.getMonth() == new Date().getMonth()){
        monthlyData.push(item)
      }
    });
    return monthlyData
  }

  updateBalance() {
    this.router.navigate(['/balance']);
  }

  getPercentage(monthSavings: number, currentBalance: number) {
    const perc = (monthSavings / currentBalance) * 100;
    return `${perc.toFixed(2)} %`; 
  }
}