import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { WalletService } from '../wallet.service';
import { Wallet } from '../wallet';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  }
  loginError: boolean = false
  userID: string = ''

  constructor(private authService: AuthService, private walletService: WalletService, private router: Router) { }

  onSubmit(){
    //Verificar login com senha errada
    this.authService.login(this.user.email, this.user.password)
    .subscribe({
      next: (data: any) => {
        console.log(data)
        this.userID = data.user.userID
        localStorage.setItem('token', JSON.stringify(data.token));
        this.loginError = false
  
        this.walletService.getWalletData(this.userID).subscribe({
          next: (data: Wallet) => {
            this.router.navigate(['/']);
          }, 
          error: (err) => {
            //Verificar outros casos de erro, esse cria carteira caso não encontre a carteira
            this.walletService.createWallet(this.userID, 0)
              .subscribe({
                next: (data: Wallet) => {
                  this.router.navigate(['/'])
                }
              })
          }
        });
      }, 
      error: (err) => {
        this.loginError = true
      }
    })
  }
}

