import { Component, OnInit } from '@angular/core';
import { IItemModel } from 'src/app/models/item.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-central-holder',
  templateUrl: './central-holder.component.html',
  styleUrls: ['./central-holder.component.scss'],
})
export class CentralHolderComponent implements OnInit {
  todoList!: IItemModel[];
  groupId!: number;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getTodos().subscribe(
      (todos: IItemModel[]) => {
        this.todoList = todos;
      }
      // (err: HttpErrorResponse) => {
      //   console.log(err);
      // },
      // () => console.log(this.todoList)
    );
  }

  filterToDos(id: number) {
    this.groupId = id;
    this.todoService.getTodosByGroupId(id).subscribe((todos: IItemModel[]) => {
      this.todoList = todos;
    });
  }
}
