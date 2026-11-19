import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ไว้เรียน interface สำหรับ Task เพื่อให้ TypeScript รู้จักโครงสร้างของ Task
interface Task {
  id: number;
  title: string;
}

@Component({
  imports: [RouterOutlet, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  title = 'My Dashboard';
  description = 'Welcome to your task management system.';
  total = 12;
  Completed = 8;
  // การคำนวนเปอร์เซ็นต์ของงานที่เสร็จสมบูรณ์
  Bonus = (Completed: number, total: number) => {
    const percentage = (Completed / total) * 100;
    return Math.min(100, Math.max(0, Number(percentage.toFixed(2))));
  };
  // ตัวแปรสำหรับเก็บชื่อ Task และรายการ Task
  taskName: string = '';
  tasks: Task[] = [];

  addTask(): void {

  const newTask = this.taskName.trim();

  if (!newTask) {
    return;
  }

  const task: Task = {
    id: Date.now(),
    title: newTask
  };

  this.tasks.push(task);

  this.taskName = '';

}
}

