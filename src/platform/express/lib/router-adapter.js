import RouterAdapter from "router-adapter";
import { Response } from "net-tools"
import { Router } from "express"

function wrapMiddleware(middleware) {
    return middleware.map(mw => async (req, res, next) => {
        try {
            await mw(req);
            next();
        } catch (err) {
            next(err);
        }
    });
}

function wrapHandler(handler) {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res);
            let {data, status, session, error, cookie, body, headers} = result;

            if (result instanceof Response) {
                let response = status ? res.status(status) : res;
                headers = Object.entries(headers || {});
                session = Object.entries(session || {});
                cookie = Object.entries(cookie || {});

                if (session.length > 0) {
                    for (const [key, value] of session) {
                        req.session[key] = value
                    }
                }

                if (cookie.length > 0) {
                    for (const [key, value] of cookie) {
                        res.cookie(key, value)
                    }
                }
                
                if (headers.length > 0) {
                    for (const [key, value] of headers) {
                        response.set(key, value)
                    }
                }

                if (body) {
                    response.send(body)
                    return;
                }

                if (data || error) {
                    response.json(data ? { data } : { error });
                    return;
                }

                response.end();
                return
            }
        } catch (err) {
            next(err);
        }
    };
}

export default class ExpressAdapter extends RouterAdapter {
    static register(){
        const router = Router();
        this.recursive(router, this.routes, this.routes.path);
        return router
    }

    static routing(router, { method, path, middleware = [], handler }) {

        wrapMiddleware(middleware).map(item => {
            router.use(path, item)
        })
        
        if (typeof method === "string" && handler != undefined) {
            router[method.toLowerCase()](
                path,
                wrapHandler(handler)
            );
        }
    }
}
