export function assertAuthenticated<T>(
  value: T | null,
  message = "User not authenticated."
): T {
  if (!value) {
    throw new Error(message);
  }

  return value;
}