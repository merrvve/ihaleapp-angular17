import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getUserRole();
    
  if (!authService.isUserLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  if(route.data['role'] && route.data['role']==role ) {
      console.log(role)
      return true;
    }
  return false;
  
};


