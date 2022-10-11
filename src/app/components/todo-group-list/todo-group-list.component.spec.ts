import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoGroupListComponent } from './todo-group-list.component';

describe('TodoGroupListComponent', () => {
  let component: TodoGroupListComponent;
  let fixture: ComponentFixture<TodoGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoGroupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
