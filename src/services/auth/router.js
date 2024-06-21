import RouterAdapter from "platform-router-adapter";
import { Response } from "net-tools";
import AuthService from "./service";

const subroute = {
  logout: {
    method: "POST",
    handler(req, res) {
      // Remove session on server
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
          const result = AuthService.login(req?.body ?? {});
          const { ok } = result;

          if (ok) {
            // Insert user session
            result.session.user = result.data.user;
            // Hide user data from service response
            result.data.user = undefined;
          }

          return result;
        },
      },
    },
  },
  google: {
    method: "GET",
    handler(){
      return AuthService.signInGoogle();
    },
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
