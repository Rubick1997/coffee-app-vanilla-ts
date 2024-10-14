import { removeFromCart } from "../../services/Order";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItemData {
  product: Product;
  quantity: number;
}

export default class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.dataset.item) {
      const item: CartItemData = JSON.parse(this.dataset.item);

      this.innerHTML = ""; // Clear the element

      const template = document.getElementById(
        "cart-item-template"
      ) as HTMLTemplateElement;
      if (template) {
        const content = template.content.cloneNode(true) as DocumentFragment;
        this.appendChild(content);

        const qtyElement = this.querySelector(".qty") as HTMLElement;
        const nameElement = this.querySelector(".name") as HTMLElement;
        const priceElement = this.querySelector(".price") as HTMLElement;
        const deleteButton = this.querySelector(
          "a.delete-button"
        ) as HTMLAnchorElement;

        if (qtyElement) qtyElement.textContent = `${item.quantity}x`;
        if (nameElement) nameElement.textContent = item.product.name;
        if (priceElement)
          priceElement.textContent = `$${item.product.price.toFixed(2)}`;

        deleteButton?.addEventListener("click", (e) => {
          e.preventDefault();
          removeFromCart(item.product.id);
        });
      }
    }
  }
}
