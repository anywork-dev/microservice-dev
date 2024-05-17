import config from "../app.config"

// Utility functions
const intersect = (a, b) => {
  return a.filter((n) => b.indexOf(n) === -1);
};

// Find missing properties of b compared to a
const compareStruct = (a, b) => {
  return intersect(Array.isArray(a) ? a : Object.keys(a), Object.keys(b));
};

// Error handler placeholder
const errorHandler = (err) => {
  console.error(err);
};

// Centralized fetch handler
const handler = async (promise, onError) => {
  let result;
  try {
    const response = await promise;
    result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Unknown error", {
        cause: result.cause || "Undefined cause",
      });
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && !contentType.includes("application/json")) {
      throw new Error("Unknown content type");
    }
  } catch (error) {
    result = { error };
    if (onError) onError(result);
  }

  return result;
};

// Base URL for the API
const BASE_URL = `${config.PROTOCOL}://${config.BASE_URL}${config.PORT ? ':' + config.PORT : ""}`;

class RestResource {
  /**
   * @param {string} route The API route for the resource
   */
  
  constructor(route) {
    this.route = route;
    this._handler = (res) => handler(res, this._error);
    this._error = errorHandler;
    this._model = [];
  }

  /**
   * Set a custom error handler
   * @param {function} callback Error handling function
   */
  onError(callback) {
    this._error = callback;
  }

  /**
   * Set a custom response handler
   * @param {function} fun Response handling function
   */
  handler(fun) {
    this._handler = fun;
  }

  /**
   * Define the model structure
   * @param {string[]|object} dataModel Model structure
   */
  model(dataModel) {
    this._model = Array.isArray(dataModel) ? dataModel : Object.keys(dataModel);
  }

  /**
   * Fetch resource by ID
   * @param {string} [id] Resource ID
   * @returns {Promise<any>}
   */
  get(id) {
    return this._handler(
      fetch(`${BASE_URL}/${this.route}${id ? `/${id}` : ""}`, {
        method: "GET",
      })
    );
  }

  /**
   * Delete resource by ID
   * @param {string|number} id Resource ID
   * @returns {Promise<any>}
   */
  delete(id) {
    return this._handler(
      fetch(`${BASE_URL}/${this.route}/${id}`, {
        method: "DELETE",
      })
    );
  }

  /**
   * Create or update resource
   * @param {string} [id] Resource ID
   * @returns {object} Object containing the body method
   */
  upsert(id) {
    return {
      body: (data) => {
        let method = !id ? "POST" : "PUT";

        // Change partially
        if (id && compareStruct(this._model, data).length > 0) {
          method = "PATCH";
        }

        return this._handler(
          fetch(`${BASE_URL}/${this.route}${id ? `/${id}` : ""}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
        );
      },
    };
  }
}

// Use configruation to direct resource manager
function ResourceDirector(dataSource) {
  return {
    "rest-source": RestResource,
  }[dataSource];
}

export default { Resource: ResourceDirector(config.DATA_SORUCE_TYPE) };
