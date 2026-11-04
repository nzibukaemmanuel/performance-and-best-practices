import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItem } from './todo-item';

describe('TodoItem', () => {
  let fixture: ComponentFixture<TodoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TodoItem] }).compileComponents();
    fixture = TestBed.createComponent(TodoItem);
    fixture.componentRef.setInput('todo', { id: 7, description: 'Write tests', completed: false });
    fixture.detectChanges();
  });

  it('emits the id when toggled', () => {
    const spy = jasmine.createSpy('toggled');
    fixture.componentInstance.toggled.subscribe(spy);
    (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('input')!.click();
    expect(spy).toHaveBeenCalledWith(7);
  });

  it('emits the id when deleted', () => {
    const spy = jasmine.createSpy('deleted');
    fixture.componentInstance.deleted.subscribe(spy);
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')!.click();
    expect(spy).toHaveBeenCalledWith(7);
  });
});
