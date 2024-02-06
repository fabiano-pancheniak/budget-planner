import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  }

  userID: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(){
    this.authService.login(this.user.email, this.user.password)
    .subscribe((data: any) => {
      this.userID = data.user.userID
      localStorage.setItem('token', JSON.stringify(data.token));
      this.router.navigate(['/']);
    });
  }
}

