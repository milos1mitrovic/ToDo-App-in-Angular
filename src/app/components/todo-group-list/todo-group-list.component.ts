import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { IGroupModel } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-group-list',
  templateUrl: './todo-group-list.component.html',
  styleUrls: ['./todo-group-list.component.scss'],
})
export class TodoGroupListComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  groups!: IGroupModel[];
  @Output() filterTodosHandler = new EventEmitter<number>();
  groupForm: FormGroup;
  newListName = '';

  constructor(
    public fb: FormBuilder,
    private groupService: GroupService,
    private todoService: TodoService
  ) {
    this.groupForm = this.fb.group({
      newListName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groupService.getGroups().subscribe((groups: IGroupModel[]) => {
      this.groups = groups;
    });
  }

  addToDoGroup() {
    let group: IGroupModel = {
      name: this.groupForm.controls['newListName'].value,
    };
    console.log(group);
    if (this.groupForm.valid) {
      this.groupService.addGroup(group).subscribe((item) => {
        this.getGroups();

        this.groupForm.reset();
        this.formDirective.resetForm();
      });
    }
  }

  filterTodos(id?: number) {
    this.filterTodosHandler.emit(id);
  }

  removeGroupItem(id?: number) {
    this.groupService.removeGroupItem(id).subscribe((item) => {
      this.getGroups();
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.groupForm.controls[control].hasError(error);
  };
}
