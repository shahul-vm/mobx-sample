import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todos.store';

@Component({
    selector: 'app-todo',
    template: `
    <input type="checkbox" (change)="complete.emit(todo)" [checked]="todo.completed">{{todo.title}}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class TodoComponent {
    @Input() todo: Todo;
    @Output() complete = new EventEmitter();
}
