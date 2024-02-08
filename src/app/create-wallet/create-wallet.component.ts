import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../wallet.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-create-wallet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-wallet.component.html',
  styleUrl: './create-wallet.component.css'
})

export class CreateWalletComponent {
  token: any = localStorage.getItem('token')  
  wallet = {
    userID: this.authService.parseJwt(this.token).userId,
    balance: 0
  }

  constructor(private walletService: WalletService, private router: Router, private authService: AuthService) {
    this.onSubmit()
  }

  onSubmit(){
    this.walletService.createWallet(this.wallet.userID, this.wallet.balance)
    .subscribe((data: any) => {
      this.router.navigate(['/']);
    });
  }

}

