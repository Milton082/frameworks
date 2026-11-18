import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCard } from './user-card';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    component = fixture.componentInstance;
    component.user = {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      address: {
        city: 'Quito',
      },
    };
    fixture.detectChanges();
  });

  it('muestra el usuario y emite el evento de favorito', () => {
    expect(fixture.nativeElement.textContent).toContain('Leanne Graham');

    let userId = 0;
    component.toggleFavorite.subscribe((id) => (userId = id));

    fixture.nativeElement.querySelector('button').click();

    expect(userId).toBe(1);
  });
});
