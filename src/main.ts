import { Router, Store } from "./services";
import { loadData } from "./services/Menu";

//Link Web Components
import { MenuPage } from "./components/MenuPage";

import { DetailsPage } from "./components/DetailsPage";
import { OrderPage } from "./components/OrderPage";

customElements.define("menu-page", MenuPage);
customElements.define("details-page", DetailsPage);
customElements.define("order-page", OrderPage);

window.app = { store: Store, router: new Router() };

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  window.app.router.init();
});

window.addEventListener("app-cart-change", () => {
  const badge = document.getElementById("badge");
  const quantity = window.app.store.cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  if (badge) {
    badge.textContent = quantity.toString();
    badge.hidden = quantity === 0;
  }
});
