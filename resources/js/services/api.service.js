import axios from 'axios';

class ApiService {
  constructor() {
    this.client = axios.create();
  }

  setAuthHeader(token) {
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  removeAuthHeader() {
    this.client.defaults.headers.common.Authorization = '';
  }

  async login(credentials) {
    const { data } = await this.client.post('/api/auth/login', credentials);
    return data;
  }

  async register(input) {
    const { data } = await this.client.post('/api/auth/register', input);
    return data;
  }

  async logout() {
    await this.client.post('/api/auth/logout');
  }

  async loadTasks() {
    const { data } = await this.client.get('/api/tasks');
    return data;
  }

  async createTask(form) {
    const { data } = await this.client.post('/api/tasks', form);
    return data;
  }

  async updateTask(id, form) {
    const { data } = await this.client.patch(`/api/tasks/${id}`, form);
    return data;
  }

  async deleteTask(id) {
    await this.client.delete(`/api/tasks/${id}`);
  }
}

export default new ApiService();
