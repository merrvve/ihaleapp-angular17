import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseAuthService } from '../services/firebaseauth.service';
import { map } from 'rxjs/internal/operators/map';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(FirebaseAuthService);
  const router = inject(Router);

  if (!authService.isUserLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return authService.userDetails$.pipe(
    map((user) => {
      const role = user?.role;
      if (route.data['role'] && route.data['role'] == role) {
        return true;
      } else {
        return false;
      }
    }),
  );
};
