export const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState(null)

  return (...args) => {
    clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => callback(...args), delay))
  }
}
