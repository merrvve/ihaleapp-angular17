import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(public auth: AuthService,private router: Router) {}
  ngOnInit(): void {
    if(this.auth.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
  login() {
    this.auth.login();
  }
}
