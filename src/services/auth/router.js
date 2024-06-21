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
        async handler(req, res) {
          const result = await AuthService.login(req?.body ?? {});

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
  confirm: {
    method: "GET",
    handler(req){
      return AuthService.confirmBasicRegistration(req);
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
