import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Todo, TodosStore } from '../todos.store';
import { TodosFilterStore, TodosFilter } from '../todos-filter.store';
import { Observable } from 'rxjs';
import { fromMobx } from 'ngx-mobx';
import 'rxjs/add/operator/do';

@Component({
    selector: 'app-todos-page',
    template: `
    <button (click)="checkAll()">Add all</button>
    <button (click)="unCheckAll()">Remove all</button>
    <app-todos [todos]="todos | async" (complete)="complete($event)"></app-todos>
    <button (click)="addTodo()">Add todo</button>
    <button (click)="setFilter('SHOW_ALL')">Show all</button>
    <button (click)="setFilter('SHOW_COMPLETED')">Show completed</button>
    <button (click)="setFilter('SHOW_ACTIVE')">Show active</button>
  `
})
export class TodosPageComponent {
    todos : Observable<Todo[]>;

    constructor( private _todosStore : TodosStore,
                 private _todosFilterStore: TodosFilterStore ) {
    }

    ngOnInit() {
        this._todosStore.getTodos();
        this.todos = fromMobx(() => this._todosStore.filteredTodos);
    }

    addTodo() {
        this._todosStore.addTodo({ title: `Todo ${this.makeid()}` });
    }

    complete( todo: Todo ) {
        this._todosStore.toggleComplete(todo);
    }

    setFilter(filter: TodosFilter) {
        this._todosFilterStore.setFilter(filter);
    }

    checkAll() {
        this._todosStore.checkAll();
    }


    unCheckAll() {
        this._todosStore.unCheckAll();
    }

    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

