export const isWitnessPath = (path) => {
  return path.startsWith('/witnesses/')
    || path.startsWith('/corpuses/')
    || path.startsWith('/figures/')
    || path.startsWith('/letters/')
}
