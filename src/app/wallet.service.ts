import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from './wallet';

@Injectable({
  providedIn: 'root',
})

export class WalletService {
  private apiUrl = 'http://localhost:3000/api/wallet';
  //private apiUrl = 'http://localhost:3000/wallets';
  private postUrl = 'http://localhost:3000/api/wallet/65b95ee3361ea42c00efc6b9/operation'
  token: any = localStorage.getItem('token')  
  
  constructor(private http: HttpClient) {
    this.token = JSON.parse(this.token)
  }
  
  createWallet(userID: string, balance: number): Observable<Wallet>{
    const url = `${this.apiUrl}`;
    return this.http.post<Wallet>(url, {userID, balance});
  }
  
  getWalletData(walletId: string): Observable<Wallet> {
    const url = `${this.apiUrl}/${walletId}`;

    // Set your headers here
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.token
    });
    this.http.get<Wallet>(url, { headers })
    return this.http.get<Wallet>(url, { headers });
  }
  
  //Refatorar
  updateBalance(walletId: String, amount: number | null, income: string, category: string): Observable<Wallet> {
    return this.http.patch<Wallet>(`${this.postUrl}`, {amount: amount, type: income, category: category})
  }


}
