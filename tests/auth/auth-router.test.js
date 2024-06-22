import { describe, it } from "vitest";
import RouterAdapter from "../../src/lib/router-adapter";
import AuthRoutes from "../../src/services/auth/router";

it("Test auth rotuer registration", () => {
  AuthRoutes.register(function () {
      console.log(arguments[0].path)
  })
});
