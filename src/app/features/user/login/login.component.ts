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
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    if (this.auth.isUserLoggedIn()) {
      if (this.auth.getUserRole() == 'ISVEREN') {
        this.router.navigate(['/isveren']);
      } else if (this.auth.getUserRole() == 'TEKLIFCI') {
        this.router.navigate(['/teklifci']);
      }
    }
  }
  login(email: string, password: string) {
   this.auth.login(email, password);
    
  }
}
