import API from "./API";

export async function loadData() {
  window.app.store.menu = await API.fetchMenu();
}

export async function getProductById(id: string) {
  if (window.app.store.menu.length === 0) {
    await loadData();
  }
  for (const c of window.app.store.menu) {
    for (let p of c.products) {
      if (p.id === Number(id)) {
        return p;
      }
    }
  }
  return null;
}
