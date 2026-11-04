export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
}
