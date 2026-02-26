import { describe, expect, it } from "vitest";
import {
  validateLoginInputs,
  validateRegisterInputs,
  validationMessages,
} from "./validation";

describe("validateLoginInputs", () => {
  it("requires email", () => {
    const result = validateLoginInputs({ email: "", password: "pw" });
    expect(result).toBe(validationMessages.emailMissing);
  });

  it("requires @ in email", () => {
    const result = validateLoginInputs({ email: "valami", password: "pw" });
    expect(result).toBe(validationMessages.emailMissingAt);
  });
});

describe("validateRegisterInputs", () => {
  it("requires username", () => {
    const result = validateRegisterInputs({
      email: "a@b.hu",
      username: "",
      password: "pw",
    });
    expect(result).toBe(validationMessages.usernameMissing);
  });
});
