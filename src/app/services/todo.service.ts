import { Injectable, computed, signal } from '@angular/core';
import { Todo, TodoStats } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly _todos = signal<Todo[]>([
    { id: 1, description: 'Build a project', completed: false },
    { id: 2, description: 'Learn React', completed: true },
  ]);
  private nextId = 3;

  readonly todos = this._todos.asReadonly();

  readonly activeTodos = computed(() => this._todos().filter((t) => !t.completed));
  readonly completedTodos = computed(() => this._todos().filter((t) => t.completed));

  readonly stats = computed<TodoStats>(() => {
    const total = this._todos().length;
    const completed = this.completedTodos().length;
    return { total, completed, pending: total - completed };
  });

  readonly progress = computed(() => {
    const { total, completed } = this.stats();
    return total === 0 ? '0%' : `${Math.round((completed / total) * 100)}%`;
  });

  add(description: string): void {
    const trimmed = description.trim();
    if (!trimmed) return;

    // Stored as plain text; the template renders it with interpolation, which escapes HTML.
    const todo: Todo = { id: this.nextId++, description: trimmed, completed: false };
    this._todos.update((list) => [...list, todo]);
  }

  toggle(id: number): void {
    this._todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  remove(id: number): void {
    this._todos.update((list) => list.filter((t) => t.id !== id));
  }
}
