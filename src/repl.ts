export function cleanInput(input: string): string[] {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    return [];
  }

  return trimmedInput.split(/\s+/).map((word) => word.toLowerCase());
}