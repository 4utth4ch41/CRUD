import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task';
import { Task } from './models/task';
import { TodoApiService, Todo } from './services/todo-api';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private taskService = inject(TaskService);

  title = 'My Dashboard';
  description = 'Welcome to your task management system.';

  // รับค่าแบบ Getter
  get total(): number {
    return this.tasks.length;
  }

  get Completed(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  // การคำนวนเปอร์เซ็นต์ของงานที่เสร็จสมบูรณ์
  Bonus = (Completed: number, total: number) => {
    // [พี่แก้ไข] ป้องกันการหารด้วยศูนย์
    if (total <= 0) {
      return 0;
    }
    const percentage = (Completed / total) * 100;
    return Math.min(100, Math.max(0, Number(percentage.toFixed(2))));
  };

  // ตัวแปรสำหรับเก็บชื่อ Task และรายการ Task
  taskName: string = '';

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  addTask(): void {
    const title = this.taskName.trim();

    if (!title) return;

    this.taskService.addTask(title);

    this.taskName = '';
  }

  // เก็บ ID ของ Task ที่กำลังแก้ไข
  editingTaskId: number | null = null;

  // กล่องเก็บข้อความที่กำลังแก้ไข
  editTaskName: string = '';

  // เริ่มแก้ไข Task
  startEdit(id: number): void {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      return;
    }

    this.editingTaskId = id;
    this.editTaskName = task.title;
  }

  // บันทึกการแก้ไข
  saveEdit(): void {
    const newTitle = this.editTaskName.trim();

    if (!newTitle || this.editingTaskId === null) {
      return;
    }

    this.taskService.updateTask(this.editingTaskId, newTitle);

    this.cancelEdit();
  }

  // ยกเลิกการแก้ไข
  cancelEdit(): void {
    this.editingTaskId = null;
    this.editTaskName = '';
  }

  // ฟังก์ชั่นการกดเสร็จงาน
  toggleComplete(id: number): void {
    this.taskService.toggleComplete(id);
  }

  // การลบข้อมูล
  deleteTask(id: number): void {
    const confirmed = window.confirm('คุณต้องการลบ Task นี้หรือไม่?');

    if (!confirmed) {
      return;
    }

    this.taskService.deleteTask(id);
  }

  // API
  private todoApiService = inject(TodoApiService);

  apiTodos: Todo[] = [];
  apiLoading = false;
  apiError = '';

  loadTodos(): void {
    this.apiLoading = true;
    this.apiError = '';

    this.todoApiService.getTodos().subscribe({
      next: (data) => {
        this.apiTodos = data;
        this.apiLoading = false;
        console.log('API Response:', data);
      },
      error: (err) => {
        this.apiError = 'ไม่สามารถโหลดข้อมูลจาก API ได้';
        this.apiLoading = false;
        console.error('API Error:', err);
      },
    });
  }
} //สิ้นสุด class App
