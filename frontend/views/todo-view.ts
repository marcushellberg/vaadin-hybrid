import { LitElement, customElement, html, property, css } from "lit-element";
import Todo from "../generated/com/example/application/model/Todo";
import { getTodos, saveTodo } from "../generated/TodoService";
import { field, Binder } from "@vaadin/form";
import TodoModel from "../generated/com/example/application/model/TodoModel";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";

@customElement("todo-view")
export class TodoView extends LitElement {
  @property({ type: Array })
  private todos: Todo[] = [];
  private binder = new Binder(this, TodoModel);

  static styles = css`
    :host {
      margin: var(--lumo-space-m);
      display: block;
    }

    .form {
      display: inline-grid;
      gap: var(--lumo-space-m);
      grid-template-columns: 3fr 1fr;
      align-items: baseline;
    }
  `;

  protected render() {
    return html`
      <h1>Todos</h1>
      <div class="form">
        <vaadin-text-field
          label="Task"
          ...=${field(this.binder.model.task)}
        ></vaadin-text-field>
        <vaadin-button @click=${this.add}>Add</vaadin-button>
      </div>
      <ul>
        ${this.todos.map((todo) => html` <li>${todo.task}</li> `)}
      </ul>

      <a href="todo-view-server" router-link>Server-side view</a>
    `;
  }

  async firstUpdated() {
    this.todos = await getTodos();
  }

  async add() {
    const saved = await this.binder.submitTo(saveTodo);
    if (saved) {
      this.todos = [...this.todos, saved];
      this.binder.clear();
    }
  }
}
