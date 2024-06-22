import { describe, it } from "vitest";
import Cryptonite from "../src/lib/cryptonite";
import RestResource from "../src/lib/resource";

it("Get hashed password", async () => {
  console.log(await Cryptonite.hashPassword("securepassword123"))
});


it("Test result of findAll", async () => {
  RestResource.$BASE_URL = "http://localhost:8000"
  RestResource.$key = "users"
  const result = await RestResource.findAll({email: "fathnakbar@gmail.com"})
  console.log(result)
});
