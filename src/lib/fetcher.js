export class Response {
    ok = true
    status = 200
    data = undefined
    error = undefined
    
    constructor(target){
        copyIfExists(target, this)
        this.error = this.error && new FetchError(this.error);
    }
}

// Utility function to copy properties from source to target if they exist in target
function copyIfExists(source, target) {
    Object.keys(source).forEach(key => {
        if (key in target) {
            target[key] = source[key];
        }
    });
}

class FetchError extends Error {
    code = 0;
    reason = "Error unknown";
    issue = "https://www.google.com/search?q=hello";

    constructor(error = {}) {
        super(error.reason || "Error unknown");
        this.name = "FetchError";
        copyIfExists(error, this);
    }
}

class FetcherOptions {
    method = "GET";
    headers = {"Content-Type": "application/json", "redirect": "follow"};
    onError = () => {};
    onLoad = () => {};

    constructor(opts = {}) {
        copyIfExists(opts, this);
        this.method = this.method.toUpperCase();
    }
}

export class Fetcher {
    url = "";
    options = new FetcherOptions();

    constructor(url, opts = {}) {
        this.url = url;
        this.options = opts instanceof FetcherOptions ? opts : new FetcherOptions(opts);
    }

    buildQueryString(data) {
        return new URLSearchParams(data).toString();
    }

    async fetch(data) {
        let fullUrl = this.url;
        const init = { ...this.options };

        if (this.options.method === 'GET' && data) {
            const queryString = this.buildQueryString(data);
            fullUrl += '?' + queryString;
        } else if (this.options.method === 'POST' && data) {
            init.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(fullUrl, init);
            const responseData = await response.json();
            if (!response.ok) {
                throw new FetchError({ HttpStatus: response.status, ...responseData });
            }
            this.options.onLoad(responseData);
            return responseData;
        } catch (error) {
            this.options.onError(error);
            return null; // Optionally return null or handle it differently
        }
    }

    onError(handler) {
        this.options.onError = handler;
    }

    onLoad(handler) {
        this.options.onLoad = handler;
    }
}