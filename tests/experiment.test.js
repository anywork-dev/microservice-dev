import { describe, it } from "vitest";
import Cryptonite from "../src/lib/cryptonite";

it("Get hashed password", async () => {
  console.log(await Cryptonite.hashPassword("securepassword123"))
});
