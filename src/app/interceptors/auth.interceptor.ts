import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { FirebaseAuthService } from '../services/firebaseauth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(FirebaseAuthService);
  const authToken = authService.getAuthorizationToken();

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};
