class API {
  public url: string;

  constructor() {
    this.url = "/src/data/menu.json";
  }

  async fetchMenu() {
    const result = await fetch(this.url);
    return await result.json();
  }
}

export default new API();
