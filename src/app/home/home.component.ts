import { Component, OnInit } from '@angular/core';
import { Wallet } from '../wallet';
import { WalletService } from '../wallet.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NgFor, NgIf]
})

export class HomeComponent implements OnInit {
  walletData: any | undefined = null;
  monthBalance = 0
  operations: any[] = []
  isTokenExpired: boolean = false
  token: any = localStorage.getItem('token');
  isLoading: boolean = true
  dateFilter: string = "Month"

  constructor(private walletService: WalletService, private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {
    //da erro se redireciona e tenta logar
    if(!this.token){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return
    }

    const userID = this.authService.parseJwt(this.token).userId
    this.isTokenExpired = this.authService.isTokenExpired(this.token)

    if(this.isTokenExpired){
      this.router.navigate(['/login']);
    }
         
      this.walletService.getWalletData(userID).subscribe({
        next: (data: Wallet) => {
          console.log(data)
          this.walletData = data.wallet;
          this.monthBalance = this.getMonthlyOperationsTotals();
          this.operations = this.getData("Month");
          this.isLoading = false
        }, 
        error: (err) => {
          //Verificar outros casos de erro, esse redireciona para o login pois não encontrou a carteira
          console.log(err)
          this.router.navigate(['/login']);
        }
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
  
  addFunds(){
    this.router.navigate(['/add-funds']);
  }

  getPercentage(monthSavings: number, currentBalance: number) {
    const perc = (monthSavings / currentBalance) * 100;
    return `${perc.toFixed(2)} %`; 
  }

  getData(type: string){
    let data: Object[] = []
    
    if(type == "Month"){
      this.walletData.operations.forEach((item: any) => {
        const itemDate = new Date(item.date)
        if(itemDate.getFullYear() == new Date().getFullYear() && itemDate.getMonth() == new Date().getMonth()){
          data.push(item)
        }
      });
      console.log(data)
      this.dateFilter = "Month"
      return this.operations = data
    }

    if(type == "Week"){
      this.walletData.operations.forEach((item: any) => {
        const itemDate = new Date(item.date)
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
        if(itemDate > sevenDaysAgo){
          data.push(item)
        }
      });
      console.log(data)
      this.dateFilter = "Week"
      return this.operations = data
    }

    this.walletData.operations.forEach((item: any) => {
        data.push(item)
      })
    console.log(data)
    
    this.dateFilter = "All"
    return this.operations = data

  }

  toggleAll(){
    this.getData('All')
  }

  toggleWeek(){
    this.getData('Week')
  }

  toggleMonth(){
    this.getData('Month')
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}