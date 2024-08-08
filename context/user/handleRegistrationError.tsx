import { logError } from "@/services/database";

export default function handleRegistrationError(errorMessage: string) {
  const newError = new Error(errorMessage);
  logError("no id", errorMessage, newError);
}
