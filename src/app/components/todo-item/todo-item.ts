import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-center justify-between bg-white p-4 rounded-xl shadow-md transition duration-150 border border-gray-100"
      [class.opacity-70]="todo().completed"
    >
      <label class="flex items-center cursor-pointer flex-grow">
        <input
          type="checkbox"
          [checked]="todo().completed"
          (change)="toggled.emit(todo().id)"
          class="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mr-4"
        />
        <span class="text-gray-700" [class.line-through]="todo().completed">{{
          todo().description
        }}</span>
      </label>
      <button
        (click)="deleted.emit(todo().id)"
        class="ml-4 text-sm text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition duration-150"
      >
        Delete
      </button>
    </div>
  `,
  styles: [
    `
      .form-checkbox {
        appearance: none;
        display: inline-block;
        border: 2px solid #d1d5db;
        border-radius: 0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        background-color: #fff;
        cursor: pointer;
        position: relative;
      }
      .form-checkbox:checked {
        background-color: #4f46e5;
        border-color: #4f46e5;
      }
      .form-checkbox:checked::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 4px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    `,
  ],
})
export class TodoItem {
  readonly todo = input.required<Todo>();
  readonly toggled = output<number>();
  readonly deleted = output<number>();
}
