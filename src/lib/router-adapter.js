export default class RouterAdapter {
    routes = {};
  
    // Register all the routes recursively
    register(router, routeRegister, basePath = '') {
      for (const [key, value] of Object.entries(routeRegister)) {
        if (key === '$base') {
          continue;
        }
        
        const path = basePath + routeRegister.$base + (key !== 'handler' ? `/${key}` : '');
        if (value.handler) {
          router.post(path, value.handler);
        }
        
        if (typeof value === 'object' && !value.handler) {
          this.register(router, value, basePath + routeRegister.$base);
        }
      }
    }
  }