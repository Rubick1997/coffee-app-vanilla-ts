class Router {
  init() {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const url = (event.target as HTMLAnchorElement).getAttribute("href");
        if (!url) return;

        this.go(url);
      });
    });
    //Event handler of url changes
    window.addEventListener("popstate", (event) => {
      this.go(event.state.route, false);
    });
    // Check initial route
    this.go(window.location.pathname, false);
  }
  go(route: string, addToHistory: boolean = true) {
    if (addToHistory) {
      window.history.pushState({ route }, "", route);
    }
    const mainElement = document.querySelector("main");
    if (!mainElement) return;
    let pageElement: HTMLElement | null = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      case `/product-${this.getParamId(route)}`: {
        pageElement = document.createElement("details-page");

        pageElement.dataset.productId = this.getParamId(route);
      }
    }

    mainElement.children[0]?.remove();
    if (pageElement) mainElement.appendChild(pageElement);
    window.scrollTo(0, 0);
  }

  getParamId(route: string) {
    return route.substring(route.lastIndexOf("-") + 1);
  }
}

export type RouterType = InstanceType<typeof Router>;

export default Router;
