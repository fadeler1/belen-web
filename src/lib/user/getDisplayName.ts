export function getDisplayName(fullName: string): string {
  return fullName.trim().split(" ")[0] || fullName;
}
