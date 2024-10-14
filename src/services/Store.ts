class Store {
  public menu: MenuCategory[];
  public cart: { product: Product; quantity: number }[];

  constructor() {
    this.menu = [];
    this.cart = [];
  }
}

const store = new Store();

const proxiedStore = new Proxy<Store>(store, {
  set: (target, prop: keyof Store, value) => {
    target[prop] = value;

    switch (prop) {
      case "menu": {
        window.dispatchEvent(new Event("app-menu-change"));
        break;
      }
      case "cart":
        window.dispatchEvent(new Event("app-cart-change"));
        break;
    }
    return true;
  },
});

export type StoreType = InstanceType<typeof Store>;

export default proxiedStore;
