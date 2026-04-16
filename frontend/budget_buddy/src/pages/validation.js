// hibauzenetek
export const validationMessages = {
  emailMissing: "Add meg az email cimet.",
  emailTooLong: "Az email cim tul hosszu.",
  emailMissingAt: "Az email cimnek tartalmaznia kell @ jelet.",
  usernameMissing: "Add meg a felhasznalonevet.",
  usernameTooLong: "A felhasznalonev tul hosszu.",
  passwordMissing: "Add meg a jelszot.",
  passwordTooLong: "A jelszo tul hosszu.",
};

// login validacio
export function validateLoginInputs({
  email = "",
  password = "",
  maxEmailLength = 100,
  maxPasswordLength = 64,
}) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return validationMessages.emailMissing;
  }
  if (trimmedEmail.length > maxEmailLength) {
    return validationMessages.emailTooLong;
  }
  if (!password) {
    return validationMessages.passwordMissing;
  }
  if (password.length > maxPasswordLength) {
    return validationMessages.passwordTooLong;
  }
  if (!email.includes("@")) {
    return validationMessages.emailMissingAt;
  }

  return null;
}

// register validacio
export function validateRegisterInputs({
  email = "",
  username = "",
  password = "",
  maxEmailLength = 100,
  maxUsernameLength = 30,
  maxPasswordLength = 64,
}) {
  const trimmedEmail = email.trim();
  const trimmedUsername = username.trim();

  if (!trimmedEmail) {
    return validationMessages.emailMissing;
  }
  if (trimmedEmail.length > maxEmailLength) {
    return validationMessages.emailTooLong;
  }
  if (!trimmedUsername) {
    return validationMessages.usernameMissing;
  }
  if (trimmedUsername.length > maxUsernameLength) {
    return validationMessages.usernameTooLong;
  }
  if (!password) {
    return validationMessages.passwordMissing;
  }
  if (password.length > maxPasswordLength) {
    return validationMessages.passwordTooLong;
  }
  if (!email.includes("@")) {
    return validationMessages.emailMissingAt;
  }

  return null;
}
