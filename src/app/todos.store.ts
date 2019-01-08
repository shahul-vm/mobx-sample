import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx';
import { TodosFilterStore } from './todos-filter.store';
import { TodosService } from './todos.service';

export class Todo {
    completed = false;
    title : string;

    constructor( { title, completed = false } ) {
        this.completed = completed;
        this.title = title;
    }
}

@Injectable()
export class TodosStore {

    @observable todos: Todo[] = [];

    constructor(private _todosFilter: TodosFilterStore,
                private _todosService: TodosService) {}



    @action async getTodos() {
        this.todos = await this._todosService.getTodos();
    }

    @action addTodo( { title } : Partial<Todo> ) {
        this.todos = [...this.todos, new Todo({ title })]
    }


    @action removeTodo( todo: Todo ) {
        this.todos = this.todos.filter(currentTodo => currentTodo !== todo);
    }

    @action toggleComplete( todo: Todo ) {
        this.todos = this.todos.map(currentTodo => {
            if( currentTodo === todo ) {
                return {
                    ...currentTodo,
                    completed: !currentTodo.completed
                }
            }
            return currentTodo;
        });
    }

    @action checkAll() {
        this.todos = this.todos.map(t => ({ ...t, completed: true}));
    }

    @action unCheckAll() {
        this.todos = this.todos.map(t => ({ ...t, completed: false}));
    }


    @computed get filteredTodos() {
        switch( this._todosFilter.filter ) {
            case 'SHOW_ALL':
                return this.todos;
            case 'SHOW_COMPLETED':
                return this.todos.filter(t => t.completed);
            case 'SHOW_ACTIVE':
                return this.todos.filter(t => !t.completed);
        }
    }

}
