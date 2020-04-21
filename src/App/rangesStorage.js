const storageKey = 'ranges';

const rangesStorage = {
  get() {
    return JSON.parse(localStorage.getItem(storageKey) || 'null');
  },
  set(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  },
  clear() {
    localStorage.removeItem(storageKey);
  },
};

export default rangesStorage;
