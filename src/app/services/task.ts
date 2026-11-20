import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private nextTaskId = 1;

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: this.nextTaskId++,
      title: title,
      completed: false,
    };

    this.tasks = [...this.tasks, newTask];
  }

  updateTask(id: number, title: string): void {
    this.tasks = this.tasks.map((task) => (task.id === id ? { ...task, title: title } : task));
  }

  toggleComplete(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
} //ตัวสิ้นสุด class TaskService
