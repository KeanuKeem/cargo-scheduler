export function emailValidator(email) {
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".");

  var regex = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  if (email === "") {
    return "Email cannot be empty!";
  } else if (!email.includes("@") || !email.includes(".")) {
    return "Email is not valid!";
  } else if (
    email[0] === "@" ||
    email[email.length - 1] === "@" ||
    email[0] === "." ||
    email[email.length - 1] === "."
  ) {
    return "Email is not valid!";
  } else if (regex.test(email)) {
    return "Email is not valid!";
  } else if (
    regex.test(email[atIndex - 1]) ||
    regex.test(email[atIndex + 1]) ||
    regex.test(email[dotIndex - 1]) ||
    regex.test(email[dotIndex + 1])
  ) {
    return "Email is not valid!";
  } else {
    return "success";
  }
}
