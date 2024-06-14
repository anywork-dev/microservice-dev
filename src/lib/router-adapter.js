const reserved = "$base $authorization";
export default class RouterAdapter {
  routes = {};

  // Register all the routes recursively
  static register(router) {
    for (const [key, value] of Object.entries(this.routes)) {
      if (reserved.includes(key)) {
        continue;
      }

      this.recursive(router, value, `${this.routes.$base}${value.path ?? `/${key}`}`);
    }
  }

  static routing(router, options){
    router(options)
  }

  static recursive(router, options, path = '') {
    let { subroute } = options;
    this.routing(router, {...options, path})

    let subroutes =
      (typeof subroute === "object" &&
        Object.entries(subroute)) ||
      [];

    for (const [key, value] of subroutes) {
      this.recursive(router, value, `${path}${value.path ?? `/${key}`}`);
    }
  }

  static match() {}
}
