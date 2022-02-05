export function debounce(
  method: { (): void; _tId?: ReturnType<typeof setTimeout> },
  delay: number,
) {
  method._tId && clearTimeout(method._tId)
  method._tId = setTimeout(function () {
    method()
  }, delay)
}
