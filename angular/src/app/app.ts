import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { User, UserCard } from './user-card/user-card';

@Component({
  imports: [UserCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);

  protected readonly users = signal<User[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly favoriteIds = signal<number[]>([]);

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

  protected toggleFavorite(userId: number) {
    if (this.favoriteIds().includes(userId)) {
      this.favoriteIds.update((ids) => ids.filter((id) => id !== userId));
    } else {
      this.favoriteIds.update((ids) => [...ids, userId]);
    }
  }
}
