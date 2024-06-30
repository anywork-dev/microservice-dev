import { describe, it } from "vitest";
import Cryptonite from "../src/lib/cryptonite";
import RestResource from "../src/lib/resource";
import EmailService from "../src/services/email/service";

it.skip("Get hashed password", async () => {
  console.log(await Cryptonite.hashPassword("securepassword123"));
});

it.skip("Test result of findAll", async () => {
  RestResource.$BASE_URL = "http://localhost:8000";
  RestResource.$key = "users";
  const result = await RestResource.findAll({ email: "fathnakbar@gmail.com" });
});


describe.skip("Test email functionality", async () => {
  it("Send email confirmation", async () => {
      const result = await EmailService.sendConfirmation({to: "fathnakbar@gmail.com", code: "entarserahaja_codenyamah"})
      console.log(result)
  })

  it("Send email invitation", async () => {
    const result = await EmailService.sendInvitation({to: "fathnakbar@gmail.com", code: "entarserahaja_codenyamah"})
    console.log(result)
  })

  it("Send email recovery", async () => {
    const result = await EmailService.sendRecovery({to: "fathnakbar@gmail.com", code: "entarserahaja_codenyamah"})
    console.log(result)
  })
})