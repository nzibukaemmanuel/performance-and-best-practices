import { ChangeDetectionStrategy, Component, SecurityContext, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from './services/todo.service';
import { WelcomeService } from './services/welcome.service';
import { TodoInput } from './components/todo-input/todo-input';
import { TodoStatsComponent } from './components/todo-stats/todo-stats';
import { TodoList } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, TodoInput, TodoStatsComponent, TodoList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-xl mx-auto p-4 bg-gray-50 min-h-screen">
      <header class="text-center mb-8">
        <h1
          class="text-3xl font-extrabold text-gray-800"
          [innerHTML]="(welcomeMessage$ | async) ?? 'Todo App'"
        ></h1>
        <p class="text-gray-500 mt-1">A legacy app built for refactoring practice</p>
      </header>

      <app-todo-input (added)="todoService.add($event)" />

      <app-todo-stats [stats]="todoService.stats()" [progress]="todoService.progress()" />

      <app-todo-list
        title="Active"
        emptyMessage="All caught up!"
        [showEmptyMessage]="todoService.stats().total > 0"
        [todos]="todoService.activeTodos()"
        (toggled)="todoService.toggle($event)"
        (deleted)="todoService.remove($event)"
      />

      <app-todo-list
        title="Completed"
        emptyMessage="No completed tasks yet."
        [showEmptyMessage]="todoService.stats().total > 0"
        [todos]="todoService.completedTodos()"
        (toggled)="todoService.toggle($event)"
        (deleted)="todoService.remove($event)"
      />
    </div>
  `,
})
export class App {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly welcomeService = inject(WelcomeService);
  protected readonly todoService = inject(TodoService);

  // Subscription is owned by the async pipe, so no ngOnInit/ngOnDestroy needed.
  // sanitize() strips <script>, event handlers and unsafe URLs; never use bypassSecurityTrust* on untrusted input.
  readonly welcomeMessage$: Observable<string> = this.welcomeService.welcomeMessage$.pipe(
    map((message) => this.sanitizer.sanitize(SecurityContext.HTML, message) ?? ''),
  );
}
