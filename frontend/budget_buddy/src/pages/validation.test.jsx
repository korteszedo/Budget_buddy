import { describe, expect, it } from "vitest";
import {
  validateLoginInputs,
  validateRegisterInputs,
  validationMessages,
} from "./validation";

// login tesztek
describe("validateLoginInputs", () => {
  // email hiany
  it("requires email", () => {
    const result = validateLoginInputs({ email: "", password: "pw" });
    expect(result).toBe(validationMessages.emailMissing);
  });

  // kukac hiany
  it("requires @ in email", () => {
    const result = validateLoginInputs({ email: "valami", password: "pw" });
    expect(result).toBe(validationMessages.emailMissingAt);
  });
});

// register tesztek
describe("validateRegisterInputs", () => {
  // nev hiany
  it("requires username", () => {
    const result = validateRegisterInputs({
      email: "a@b.hu",
      username: "",
      password: "pw",
    });
    expect(result).toBe(validationMessages.usernameMissing);
  });
});
