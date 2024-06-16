import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../../services/firebaseauth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: FirebaseAuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.auth.userDetails$.subscribe({
      next: (value)=> {
        if(value) {
          if(value.role==="ISVEREN") {
            this.router.navigate(['/isveren'])
          }
          else{
            this.router.navigate(['/teklifci'])
          }
        }
      }
    })
  }
  login(email: string, password: string) {
   this.auth.login(email, password);
    
  }
}
