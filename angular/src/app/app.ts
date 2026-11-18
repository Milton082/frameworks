import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);

  protected readonly users = signal<User[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  constructor() {
    this.getUsers();
  }

  private getUsers() {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users', {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok && response.body) {
            this.users.set(response.body);
          } else {
            this.error.set('No se pudieron obtener los usuarios.');
          }

          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron obtener los usuarios.');
          this.loading.set(false);
        },
      });
  }
}
