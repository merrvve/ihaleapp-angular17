import { ApplicationConfig ,LOCALE_ID} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from './environments/environment';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [

    provideAnimations(),
    provideRouter(routes),
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig},
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    //      provideDatabase(() => getDatabase()),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
    DatePipe,
  ],
};
