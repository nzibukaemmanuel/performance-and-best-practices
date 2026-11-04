import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WelcomeService {
  fetchWelcomeMessage(): Observable<string> {
    console.log('API Call: Fetching welcome message (no caching)');
    return of(
      '<span style="color: #4f46e5; font-weight: bold;">My Refactoring App (Sanitized)</span><script>console.warn("SECURITY WARNING: XSS vulnerability active in header!");</script>',
    );
  }
}
