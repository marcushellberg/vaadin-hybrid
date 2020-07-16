import { Flow } from "@vaadin/flow-frontend/Flow";
import { Router, Route } from "@vaadin/router";

import "./global-styles";
import "./views/main-view";
import "./views/todo-view";

const { serverSideRoutes } = new Flow({
  imports: () => import("../target/frontend/generated-flow-imports"),
});

const routes: Route[] = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v15/flow/typescript/creating-routes.html)
  { path: "todo-view-client", component: "todo-view" },
  { path: "", component: "main-view" },
  ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
];

export const router = new Router(document.querySelector("#outlet"));
router.setRoutes(routes);
