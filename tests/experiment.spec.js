import { describe, it } from "vitest";
import UserResource from "../src/model/auth.model";
import AuthService from "../src/services/auth/service";
import Cryptonite from "../src/lib/cryptonite";

it("Test user resource", () => {
  UserResource.model(["id", "contact"])
  console.log(UserResource.$model)
})


describe.only("Authentication Service", () => {
  it("Test login function", async () => {
    console.log(await AuthService.login({username: "fathnakbar", password: "this is my password"}))
  })

  it.skip("Generates password hash", async () => {
    console.log(await Cryptonite.hashPassword("fathnakbar2003"))
  })
})
