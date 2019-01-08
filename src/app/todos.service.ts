import { Injectable } from '@angular/core';
import { Todo } from './todos.store';

@Injectable({
    providedIn: 'root',
})
export class TodosService {

    constructor() { }

    getTodos() {
        return new Promise<Todo[]>(funStuff => {
            setTimeout(() => {
                funStuff([new Todo({ title: 'Learn Mobx' })])
            }, 1000);
        });

    }

}