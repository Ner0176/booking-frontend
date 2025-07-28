function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function stringIncludes(text: string, filter: string) {
  return normalize(text).includes(normalize(filter));
}
