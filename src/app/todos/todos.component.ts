import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todos.store';

@Component({
    selector: 'app-todos',
    template: `
    <ul>
      <li *ngFor="let todo of todos">
        <app-todo [todo]="todo" (complete)="complete.emit($event)"></app-todo>
      </li>
    </ul>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
    @Input() todos: Todo[] = [];
    @Output() complete = new EventEmitter();
}
