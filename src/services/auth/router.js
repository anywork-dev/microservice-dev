import RouterAdapter from "platform-router-adapter";
import { Response } from "net-tools";
import AuthService from "./service";

const subroute = {
  logout: {
    method: "POST",
    handler(req, res) {
      // Login Service
      return AuthService.login(req?.body ?? {});
    },
  },
  login: {
    middleware: [],
    method: "POST",
    subroute: {
      basic: {
        middleware: [],
        method: "POST",
        handler(req, res) {
          // Login Service
          return AuthService.login(req?.body ?? {});
        },
      },
    },
  },
  google: {
    subroute: {
      callback: {
        method: "GET",
        handler(req, res) {
          
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
          return AuthService.basicRegistration(req)
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
    method: "GET",
    handler(req, res) {
      return AuthService.session(req)
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
