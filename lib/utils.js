export function sanitizeFilename(filename) {
  // Replace any character that is not a letter, number, dot, or hyphen with an underscore
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
}
