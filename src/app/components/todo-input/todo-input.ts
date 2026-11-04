import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex mb-8">
      <input
        [ngModel]="description()"
        (ngModelChange)="description.set($event)"
        (keyup.enter)="submit()"
        placeholder="What needs to be done? (Try adding a script tag!)"
        class="flex-grow p-3 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        (click)="submit()"
        class="px-5 py-3 bg-gray-800 text-white font-semibold rounded-r-lg hover:bg-black transition duration-150"
      >
        Add
      </button>
    </div>
  `,
})
export class TodoInput {
  readonly added = output<string>();
  protected readonly description = signal('');

  protected submit(): void {
    const value = this.description().trim();
    if (!value) return;
    this.added.emit(value);
    this.description.set('');
  }
}
