import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { IItemModel } from 'src/app/models/item.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  @Input() todoList!: IItemModel[];
  @Input() groupId!: number;
  myForm: FormGroup;
  editForm: FormGroup;

  isEdit: boolean = false;
  selectedId?: number;

  constructor(public fb: FormBuilder, private todoService: TodoService) {
    this.myForm = this.fb.group({
      description: ['', [Validators.required]],
    });

    this.editForm = this.fb.group({
      description: ['', [Validators.required]],
      id: [''],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.myForm.valid) {
      this.addToDoItem();
    }
  }

  submitEditForm() {
    if (this.editForm.valid) {
      let data: IItemModel = {
        id: this.editForm.controls['id'].value,
        description: this.editForm.controls['description'].value,
      };
      this.todoService.editTodoItem(data).subscribe((res) => {
        this.selectedId = undefined;
        this.loadData();
      });
    }
  }

  loadData() {
    this.todoService.getTodosByGroupId(this.groupId).subscribe((items) => {
      this.todoList = items;
    });
  }

  addToDoItem() {
    let newData: IItemModel = {
      description: this.myForm.controls['description'].value,
      groupId: this.groupId,
    };
    this.todoService.addTodoItem(newData).subscribe((item) => {
      this.loadData();
      this.myForm.reset();
      this.formDirective.resetForm();
    });
  }

  removeToDoItem(id?: number) {
    this.todoService.removeTodoItem(id).subscribe((item) => {
      this.loadData();
    });
  }

  editItem(id?: number, description?: string, groupId?: number) {
    if (this.selectedId != id) {
      this.selectedId = id;
      this.editForm.controls['id'].setValue(id);
      this.editForm.controls['description'].setValue(description);
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  };

  public errorEditHandling = (control: string, error: string) => {
    return this.editForm.controls[control].hasError(error);
  };
}
