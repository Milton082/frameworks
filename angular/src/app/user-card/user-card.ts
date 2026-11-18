import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) isFavorite = false;
  @Output() toggleFavorite = new EventEmitter<number>();
}
