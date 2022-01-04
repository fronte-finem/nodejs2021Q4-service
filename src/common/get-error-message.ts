export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  switch (typeof error) {
    case 'string':
      return error;
    case 'object':
      return JSON.stringify(error);
    default:
      return String(error);
  }
}
