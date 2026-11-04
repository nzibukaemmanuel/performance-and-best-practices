import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WelcomeService } from './welcome.service';

describe('WelcomeService', () => {
  it('executes the simulated API call only once for many subscribers', fakeAsync(() => {
    const logSpy = spyOn(console, 'log');
    const service = TestBed.inject(WelcomeService);
    const results: string[] = [];

    service.welcomeMessage$.subscribe((m) => results.push(m));
    service.welcomeMessage$.subscribe((m) => results.push(m));
    tick(500);
    service.welcomeMessage$.subscribe((m) => results.push(m));
    tick(500);

    expect(results.length).toBe(3);
    const apiCalls = logSpy.calls.allArgs().filter(([msg]) => String(msg).startsWith('API Call'));
    expect(apiCalls.length).toBe(1);
  }));
});
