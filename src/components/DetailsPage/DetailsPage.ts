import { getProductById } from "../../services/Menu";
import { addToCart } from "../../services/Order";
import css from "./DetailsPage.css?inline";

export class DetailsPage extends HTMLElement {
  public product: Product | null;
  public root: ShadowRoot;

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    this.createStyles();
    this.product = null;

    const template = document.getElementById("details-page-template");
    if (template) {
      const content = (template as HTMLTemplateElement).content.cloneNode(true);
      const styles = document.createElement("style");
      this.root.appendChild(styles);
      this.root.appendChild(content);
    }
  }

  createStyles() {
    const styles = document.createElement("style");

    this.root.appendChild(styles);
    styles.innerText = css;
  }

  async renderData() {
    if (this.dataset.productId) {
      this.product = await getProductById(this.dataset.productId);

      if (!this.product) return;

      const nameElement = this.root.querySelector("h2") as HTMLHeadingElement;
      const imageElement = this.root.querySelector("img") as HTMLImageElement;
      const descriptionElement = this.root.querySelector(
        ".description"
      ) as HTMLParagraphElement;
      const priceElement = this.root.querySelector(".price") as HTMLSpanElement;
      const buttonElement = this.root.querySelector(
        "button"
      ) as HTMLButtonElement;

      if (nameElement) nameElement.textContent = this.product.name;

      if (imageElement)
        imageElement.src = `/src/data/images/${this.product.image}`;
      if (descriptionElement)
        descriptionElement.textContent = this.product.description;
      if (priceElement)
        priceElement.textContent = `$ ${this.product.price.toFixed(2)} ea`;

      buttonElement?.addEventListener("click", () => {
        if (this.product) {
          addToCart(this.product.id);
          window.app.router.go("/order");
        }
      });
    } else {
      alert("Invalid Product ID");
    }
  }

  connectedCallback() {
    this.renderData();
  }
}
