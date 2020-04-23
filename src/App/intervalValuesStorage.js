const storageKey = 'intervals';

const intervalValuesStorage = {
  get() {
    return JSON.parse(localStorage.getItem(storageKey) || 'null');
  },
  set(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  },
  clear() {
    localStorage.removeItem(storageKey);
  },
  get length() {
    return Object.keys(this.get()).length;
  },
};

export default intervalValuesStorage;
