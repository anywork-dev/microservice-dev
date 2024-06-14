// Each middleware and handler is a pure function

const reserved = "$base $authorization $middleware";
export default class RouterAdapter {
  routes = {};

  // Register all the routes recursively
  static register(router) {
    this.recursive(router, this.routes, this.routes.path);
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
