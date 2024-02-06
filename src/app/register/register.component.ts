import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit(){
    if(this.user.password != this.user.confirmPassword){
      console.log('senhas não coincidem')
      return
    }

    this.authService.register(this.user.name, this.user.email, this.user.password)
    .subscribe((data: any) => {
      console.log(data)
    });
  }
}
