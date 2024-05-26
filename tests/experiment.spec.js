import { it } from "vitest";

// Copy source properties if the property exists in target
function copyIfExists(source, target) {
    for (const key in source) {
        if (Object.hasOwnProperty.call(source, key) && key in target) {
            target[key] = source[key];
        }
    }
}

class FetchError {
    code = 0;
    HttpStatus = 0;
    reason = "Error unknown"
    issue = "https://www.google.com/search?q=hello"
    constructor(error){
        error = error || {} // use default value
        copyIfExists(error, this)
    }
}

class FetcherOptions {
  method = "GET";
  header = {"Content-Type": "application/json", redirect: 'follow'};
  onError = () => {return};
  onLoad = () => {return};

  constructor(opts) {
    opts = opts || {}
    copyIfExists(opts, this)

    this.method = (this.method || "GET").toUpperCase();
  }
}


export class Fetcher {
    url = "";
    options = new FetcherOptions();

    constructor(url, opts) {
        this.url = url;
        this.options = opts instanceof FetcherOptions ? opts : this.options;
    }

    fetch(data) {
        let request = fetch(this.url, this.options)
        
        if (this.options.header["Content-Type"] == "application/json") {
            return request
            .then(response => Promise.all([response, response.json()]))
            .then(([response, data]) => {
                if (!response.ok && response) {
                    throw FetchError({HttpStatus: response.status, ...data})
                }
            })
            .catch(error => {
                this.options.onError(error)
                return error;
            })
        }
    }

    onError(handler){
        this.options.onError = handler;
    }

    onLoad(handler){
        this.options.onLoad = handler;
    }
}

it("See if class can logs its keys", () => {
  let a = new FetcherOptions({method: "GET"});
});
