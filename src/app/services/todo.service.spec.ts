import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('computes stats and progress from the seed data', () => {
    expect(service.stats()).toEqual({ total: 2, completed: 1, pending: 1 });
    expect(service.progress()).toBe('50%');
  });

  it('adds tasks immutably and ignores blank input', () => {
    const before = service.todos();
    service.add('   ');
    expect(service.todos()).toBe(before);

    service.add('New task');
    expect(service.todos()).not.toBe(before);
    expect(service.todos().length).toBe(3);
  });

  it('toggles and removes tasks', () => {
    service.toggle(1);
    expect(service.stats().completed).toBe(2);
    service.remove(1);
    expect(service.stats().total).toBe(1);
  });

  it('stores malicious input as inert text', () => {
    service.add('<img src=x onerror=alert(1)>');
    expect(service.todos().at(-1)!.description).toBe('<img src=x onerror=alert(1)>');
  });
});
