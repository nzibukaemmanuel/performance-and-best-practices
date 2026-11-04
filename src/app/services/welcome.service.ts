import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WelcomeService {
  /**
   * Simulated API call. `defer` makes the "network" work run per subscription,
   * and `shareReplay` collapses all subscribers into a single execution whose
   * result is replayed to late subscribers.
   */
  readonly welcomeMessage$: Observable<string> = defer(() => {
    console.log('API Call: Fetching welcome message (executes once)');
    return of(
      '<span style="color: #4f46e5; font-weight: bold;">My Refactoring App</span><script>console.warn("SECURITY WARNING: XSS vulnerability active in header!");</script>',
    ).pipe(delay(300));
  }).pipe(shareReplay({ bufferSize: 1, refCount: false }));
}
