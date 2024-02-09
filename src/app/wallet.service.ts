import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
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
  
  createWallet(userID: string, balance: Number): Observable<Wallet>{
    const url = `${this.apiUrl}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.token
    });

    return this.http.post<Wallet>(url, {userID, balance}, { headers });
  }
  
  getWalletData(walletId: string): Observable<Wallet> {
    const url = `${this.apiUrl}/${walletId}`;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.token
    });
  
    return this.http.get<Wallet>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  //Refatorar
  updateBalance(userID: String, amount: number | null, income: string, category: string): Observable<Wallet> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.token
    });

    return this.http.patch<Wallet>(`${this.apiUrl}/${userID}/operation`, {amount: amount, type: income, category: category}, {headers})
  }

  addFunds(userID: String, balance: number): Observable<Wallet> {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.token
    });

    return this.http.patch<Wallet>(`${this.apiUrl}/${userID}/add-funds`, {balance}, {headers})
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
