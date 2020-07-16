package com.example.application.service;

import java.util.List;

import com.example.application.backend.TodoRepository;
import com.example.application.model.Todo;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class TodoService {

  private TodoRepository repo;

  TodoService(TodoRepository repo) {
    this.repo = repo;
  }

  public List<Todo> getTodos() {
    return repo.findAll();
  }

  public Todo saveTodo(Todo todo) {
    return repo.save(todo);
  }
}