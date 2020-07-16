import { LitElement, customElement, html } from "lit-element";

@customElement("main-view")
export class MainView extends LitElement {
  render() {
    return html`
      <ul>
        <li><a href="todo-view-client" router-link>Client-side view</a></li>
        <li><a href="todo-view-server" router-link>Server-side view</a></li>
      </ul>
    `;
  }
}
