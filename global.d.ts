import { RouterType } from "./src/services/Router";
import { StoreType } from "./src/services/Store";

export {};

declare global {
  interface Window {
    app: { [key: string]: any; store: StoreType; router: RouterType };
  }
  interface HTMLElement {
    root: ShadowRoot;
  }
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }

  interface MenuCategory {
    name: string;
    products: Product[];
  }

  type User = {
    name: string;
    phone: string;
    email: string;
  };
}
