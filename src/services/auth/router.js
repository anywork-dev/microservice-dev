import RouterAdapter from "platform-router-adapter";
import { Response } from "net-tools";
import AuthService from "./service";

const subroute = {
  login: {
    middleware: [],
    method: "POST",
    subroute: {
      basic: {
        middleware: [],
        method: "POST",
        subroute: {},
        handler(req, res) {
          // Implement login logic here
          return new Response({ status: 301, headers: { Location: "https://google.com" }, error: {reason: "Unimplemented logic for login"} });
        },
      },
    },
  },
  google: {
    subroute: {
      callback: {
        method: "GET",
        subroute: {},
        handler(req, res) {
          // Implement login logic here
          return AuthService.googleCallback(req, res);
        },
      }
    }
  },
  register: {
    method: "POST",
    subroute: {
      basic: {
        middleware: [],
        method: "POST",
        subroute: {},
        handler(req, res) {
          // Implement login logic here
          return new Response({ status: 401, ok: false, data });
        },
      },
    },
    handler(req, res) {
      // Implement register logic here
      return new Response({ status: 200, ok: true, data });
    },
  },
  recovery: {
    handler(req, res) {
      // Implement recovery logic here
      res.send("Recovery email sent");
    },
  },
  session: {
    handler(req, res) {
      // Implement session logic here
      res.send("Session valid");
    },
  },
};

const routes = {
  path: "/api/auth",
  subroute
};

export default class AuthRoutes extends RouterAdapter {
  static routes = routes;
}
