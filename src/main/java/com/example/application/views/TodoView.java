package com.example.application.views;

import com.example.application.model.Todo;
import com.example.application.service.TodoService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.router.Route;

@Route("todo-view-server")
public class TodoView extends VerticalLayout {

  TodoView(TodoService service) {
    var task = new TextField("Task");
    var add = new Button("Add");
    var todoList = new UnorderedList();
    var form = new HorizontalLayout(task, add);
    form.setAlignItems(Alignment.BASELINE);

    add(new H1("Todos"), form, todoList, new Anchor("todo-view-client", "Client-side view"));

    for (Todo todo : service.getTodos()) {
      todoList.add(new ListItem(todo.getTask()));
    }

    var binder = new BeanValidationBinder<>(Todo.class);
    binder.forField(task).bind("task");

    add.addClickListener(e -> {
      var todo = new Todo();
      if (binder.writeBeanIfValid(todo)) {
        var saved = service.saveTodo(todo);
        todoList.add(new ListItem(saved.getTask()));
        binder.readBean(new Todo());
      }
    });
  }
}