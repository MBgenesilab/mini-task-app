import { apiService } from '../../services';

const state = {
  tasks: [],
  parentTasks: [],
  selectedTask: null,
  status: '',
};

const getters = {
  allTasks: (state) => state.tasks,
  parentTasks: (state) => state.parentTasks,
  taskStatus: (state) => state.status,
  selectedTask: (state) => state.selectedTask,
};

const actions = {
  async fetchTasks({ commit }) {
    commit('fetch_request');
    try {
      const { data } = await apiService.loadTasks();
      commit('set_tasks', data);
    } catch (error) {
      commit('fetch_error');
      throw error;
    }
  },
  async addTask({ commit }, task) {
    const { data } = await apiService.createTask(task);
    commit('new_task', data);
  },
  async deleteTask({ commit }, id) {
    await apiService.deleteTask(id);
    commit('remove_task', id);
  },
  async updateTask({ commit }, updatedTask) {
    await apiService.updateTask(updatedTask.id, updatedTask);
  },
  async setSelectedTask({ commit }, task) {
    commit('set_selected_task', task);
  },
};

const mutations = {
  fetch_request(state) {
    state.status = 'loading';
  },
  set_tasks(state, { tasks, parentTasks }) {
    state.tasks = tasks;
    state.parentTasks = parentTasks;
    state.status = 'success';
  },
  fetch_error(state) {
    state.status = 'error';
  },
  new_task(state, task) {
    state.tasks.push(task);
  },
  remove_task(state, id) {
    state.tasks = state.tasks.filter((task) => task.id !== id);
  },
  set_selected_task(state, selectedTask) {
    state.selectedTask = selectedTask;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
