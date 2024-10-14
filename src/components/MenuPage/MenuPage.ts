import css from "./MenuPage.css?inline";
import { ProductItem } from "../ProductItem";

customElements.define("product-item", ProductItem);

export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.createStyles();
  }

  // when component is attach to the DOM
  connectedCallback() {
    const template = document.getElementById(
      "menu-page-template"
    ) as HTMLTemplateElement;
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.render();
    window.addEventListener("app-menu-change", () => {
      this.render();
    });
  }

  createStyles() {
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    styles.innerText = css;
  }

  render() {
    const menuStore = window.app.store.menu;
    const menu = this.root.querySelector("#menu");

    if (menuStore && menu) {
      menu.innerHTML = "";
      menuStore.forEach((category) => {
        const liCategory = document.createElement("li");

        const categoryName = document.createElement("h3");
        const ulList = document.createElement("ul");

        ulList?.classList.add("category");
        categoryName.textContent = category.name;

        liCategory.appendChild(categoryName);
        liCategory.appendChild(ulList);

        menu.appendChild(liCategory);
        category.products.forEach((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul")?.appendChild(item);
        });
      });
    } else {
      this.root.innerHTML = "<p>Loading...</p>";
    }
  }
}
