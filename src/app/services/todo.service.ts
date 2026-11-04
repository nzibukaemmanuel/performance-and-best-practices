import { Injectable } from '@angular/core';
import { Todo, TodoStats } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos: Todo[] = [
    { id: 1, description: 'Build a project', completed: false },
    { id: 2, description: 'Learn React', completed: true },
  ];
  private nextId = 3;

  getStats(): TodoStats {
    const total = this.todos.length;
    const completed = this.todos.filter((t) => t.completed).length;

    for (let i = 0; i < 10000; i++) {}

    return { total, completed, pending: total - completed };
  }

  getProgressPercentage(): string {
    const stats = this.getStats();
    if (stats.total === 0) return '0%';
    return `${Math.round((stats.completed / stats.total) * 100)}%`;
  }

  add(description: string): void {
    const trimmed = description.trim();
    if (!trimmed) return;

    let text = trimmed;
    if (text.toLowerCase().includes('<script>')) {
      text = `<span style="color: red;">[Script Detected]</span> ` + text;
    }
    this.todos.push({ id: this.nextId++, description: text, completed: false });
  }

  toggle(todo: Todo): void {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      this.todos[index].completed = !this.todos[index].completed;
      this.todos = [...this.todos];
    }
  }

  remove(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}
