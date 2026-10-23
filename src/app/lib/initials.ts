// Iniciales para avatares: primera y última palabra del nombre, en mayúsculas.
export function getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "?";
    const first = Array.from(words[0])[0];
    if (words.length === 1) return first.toUpperCase();
    const last = Array.from(words[words.length - 1])[0];
    return (first + last).toUpperCase();
}
