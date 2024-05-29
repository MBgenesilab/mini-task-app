class StorageService {
  save(key, data) {
    console.log({ key, data });
    localStorage.setItem(key, data);
  }

  get(key) {
    return localStorage.getItem(key);
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

export default new StorageService();
