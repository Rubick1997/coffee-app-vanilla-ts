import { getProductById } from "./Menu";

export async function addToCart(id: number) {
  const product = await getProductById(id.toString());
  if (!product) return;
  const results = window.app.store.cart.filter(
    (item) => item.product.id === product?.id
  );
  if (results.length === 1) {
    window.app.store.cart = window.app.store.cart.map((item) => {
      if (item.product.id === product.id) {
        return { product, quantity: item.quantity + 1 };
      }
      return item;
    });
  } else {
    window.app.store.cart = [
      ...window.app.store.cart,
      { product, quantity: 1 },
    ];
  }
}

export async function removeFromCart(id: number) {
  window.app.store.cart = window.app.store.cart.filter(
    (item) => item.product.id !== id
  );
}
