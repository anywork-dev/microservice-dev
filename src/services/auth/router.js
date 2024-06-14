import RouterAdapter from "platform-router-adapter";
import { Response } from "net-tools";
import AuthService from "./service";

const subroute = {
  login: {
    middleware: [],
    method: "POST",
    subroute: {
      basic: {
        path: "/basic-login",
        middleware: [],
        method: "POST",
        subroute: {},
        handler(req, res) {
          // Implement login logic here
          return new Response({ status: 404, ok: false, error: {reason: "Unimplemented logic"} });
        },
      },
      google: {
        path: "/login-with-google",
        middleware: [],
        method: "POST",
        subroute: {},
        handler(req, res) {
          // Implement login logic here
          return new Response({ status: 404, ok: false, data });
        },
      },
    },
    handler(req, res) {
      // Implement login logic here
      return new Response({ status: 404, ok: false, error: { reason: "Unimplemented logic" } });
    },
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
  middleware: [(req) => console.log("Accessing: ", req?.path)],
  subroute
};

export default class AuthRoutes extends RouterAdapter {
  static routes = routes;
}
