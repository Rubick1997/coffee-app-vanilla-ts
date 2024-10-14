import { addToCart } from "../../services/Order";

export class ProductItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById(
      "product-item-template"
    ) as HTMLTemplateElement;
    if (!template) return;
    const content = template.content.cloneNode(true) as DocumentFragment;

    this.appendChild(content);

    const product: Product = JSON.parse(this.dataset.product || "{}");

    const nameElement = this.querySelector("h4") as HTMLHeadingElement;
    const priceElement = this.querySelector("p.price") as HTMLParagraphElement;
    const imageElement = this.querySelector("img") as HTMLImageElement;
    const linkElement = this.querySelector("a") as HTMLAnchorElement;

    if (nameElement) nameElement.textContent = product.name;
    if (priceElement) priceElement.textContent = `$${product.price.toFixed(2)}`;
    if (imageElement) imageElement.src = `src/data/images/${product.image}`;

    linkElement?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName.toLowerCase() === "button") {
        addToCart(product.id);
      } else {
        window.app.router.go(`/product-${product.id}`);
      }
      event.preventDefault();
    });
  }
}
