import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from './wallet';

@Injectable({
  providedIn: 'root',
})

export class WalletService {
  private apiUrl = 'http://localhost:3000/api/wallet';
  //private apiUrl = 'http://localhost:3000/wallets';
  private postUrl = 'http://localhost:3000/api/wallet/65b95ee3361ea42c00efc6b9/operation'

  constructor(private http: HttpClient) {}

  getWalletData(walletId: string): Observable<Wallet> {
    const url = `${this.apiUrl}/${walletId}`;
    return this.http.get<Wallet>(url);
  }
  
  //Refatorar
  updateBalance(walletId: String, amount: number | null, income: string): Observable<Wallet> {
    return this.http.patch<Wallet>(`${this.postUrl}`, {amount: amount, type: income})
  }
}
