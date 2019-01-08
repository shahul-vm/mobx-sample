import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { TodosStore } from './todos.store';
import { TodosFilterStore } from './todos-filter.store';

@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, TodoComponent, TodosComponent, TodosPageComponent ],
    bootstrap:    [ AppComponent ],
    providers: [ TodosStore, TodosFilterStore ]
})
export class AppModule { }
