import CartItem from "./CartItem";
import css from "./OrderPage.css?inline";

customElements.define("cart-item", CartItem);

export class OrderPage extends HTMLElement {
  public root = this.attachShadow({ mode: "open" });
  private user: User = {
    name: "",
    phone: "",
    email: "s",
  };

  constructor() {
    super();

    const styles = document.createElement("style");
    this.root.appendChild(styles);
    const section = document.createElement("section");
    this.root.appendChild(section);

    this.createStyles();
  }

  connectedCallback() {
    window.addEventListener("app-cart-change", () => {
      this.render();
    });
    this.render();
  }

  createStyles() {
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    styles.innerText = css;
  }

  render() {
    const section = this.root.querySelector("section");

    if (section) {
      if (window.app.store.cart.length == 0) {
        section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
      } else {
        let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
        section.innerHTML = html;

        const template = document.getElementById(
          "order-form-template"
        ) as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        section.appendChild(content);
      }

      let total = 0;
      const ul = this.root.querySelector("ul");
      if (!ul) return;
      for (let prodInCart of window.app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(prodInCart);
        ul.appendChild(item);

        total += prodInCart.quantity * prodInCart.product.price;
      }
      ul.innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;
    }

    this.setFormBindings(this.root.querySelector("form") as HTMLFormElement);
  }

  setFormBindings(form: HTMLFormElement) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(
        `Thanks for your order ${this.user.name}. ${
          this.user.email
            ? "We will be sending you the receipt over email."
            : "Ask at the counter for a receipt."
        }`
      );

      this.user.email = "";
      this.user.name = "";
      this.user.phone = "";

      // TODO: sent user and cart's details to the server
    });

    // Set double data binding

    Array.from(form.elements as HTMLCollectionOf<HTMLFormElement>).forEach(
      (element) => {
        if (element.name) {
          element.addEventListener("change", () => {
            this.user[element.name as keyof User] = element.value;
          });
        }
      }
    );
    this.user = new Proxy(this.user, {
      set(target, property: keyof User, value) {
        target[property] = value;
        const el = form.elements.namedItem(property) as HTMLFormElement;
        if (el) el.value = value;
        return true;
      },
    });
  }
}
