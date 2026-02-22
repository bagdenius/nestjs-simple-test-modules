export function formatName(name: string) {
  return name
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('');
}
