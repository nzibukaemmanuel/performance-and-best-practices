import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ title() }} ({{ todos().length }})</h2>
    <div class="space-y-3 mb-8">
      @for (todo of todos(); track todo.id) {
        <app-todo-item
          [todo]="todo"
          (toggled)="toggled.emit($event)"
          (deleted)="deleted.emit($event)"
        />
      }
      @if (todos().length === 0 && showEmptyMessage()) {
        <div class="text-center text-gray-500 p-4">{{ emptyMessage() }}</div>
      }
    </div>
  `,
})
export class TodoList {
  readonly title = input.required<string>();
  readonly todos = input.required<Todo[]>();
  readonly emptyMessage = input('Nothing here.');
  readonly showEmptyMessage = input(true);
  readonly toggled = output<number>();
  readonly deleted = output<number>();
}
