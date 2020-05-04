const createJsonStorage = (storageKey) => ({
  get() {
    return JSON.parse(localStorage.getItem(storageKey) || 'null')
  },
  set(data) {
    localStorage.setItem(storageKey, JSON.stringify(data))
  },
  clear() {
    localStorage.removeItem(storageKey)
  },
})

export default createJsonStorage
