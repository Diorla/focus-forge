export default function ErrorReader(message: string) {
  if (message.includes("invalid-credential"))
    return "Email and password does not match";
  if (message.includes("email-already-in-use")) return "Email already in use";
  if (message.includes("weak-password")) return "Password is too weak";
  if (message.includes("user-not-found")) return "Email does not exist";
  if (message.includes("invalid-email")) return "Email is invalid";
  if (message.includes("missing-email")) return "Please provide an email";
  if (message.includes("too-many-requests"))
    return "Too many failed sign in, please reset password";
  return message;
}
