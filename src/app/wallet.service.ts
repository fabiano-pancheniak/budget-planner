import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from './wallet';

@Injectable({
  providedIn: 'root',
})

export class WalletService {
  //private apiUrl = 'http://localhost:3000/api/wallet';
  private apiUrl = 'http://localhost:3000/wallets';

  constructor(private http: HttpClient) {}

  getWalletData(walletId: string): Observable<Wallet> {
    const url = `${this.apiUrl}/${walletId}`;
    return this.http.get<Wallet>(url);
  }
}
