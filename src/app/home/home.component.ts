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
  monthBalance = 0

  constructor(private walletService: WalletService, private router: Router) { }

  ngOnInit(): void {
    const walletId = '65b95ee3361ea42c00efc6b9'; 
    //const walletId = 'af47'; 
    this.walletService.getWalletData(walletId)
    .subscribe((data: Wallet) => {
        this.walletData = data.wallet;
        this.monthBalance = this.getMonthlyOperationsTotals()
      });
    
    }

  getMonthlyOperationsTotals(){
    let operationsBalance: number = 0
    let monthlyData2 = this.getMonthlyData()
    monthlyData2.forEach((item: any) => {
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
}