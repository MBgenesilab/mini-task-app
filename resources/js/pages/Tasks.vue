<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">All Tasks</span>
            <v-spacer></v-spacer>
            <v-btn color="green" @click="showEditDialog = true" size="small">
              Add
            </v-btn>
          </v-card-title>
          <div v-if="taskStatus === 'loading'" class="text-center">
            Loading...
          </div>
          <div v-else>
            <TaskList
              v-if="allTasks.length"
              :tasks="allTasks"
              @edit="openEditDialog"
              @delete="openConfirmDialog"
            />
            <div v-else class="text-center">
              <p>Tasks not found</p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <TaskEditDialog
      :show="showEditDialog"
      @close="handleEditDialogClose"
      @submit="handleSubmit"
    />
    <ConfirmDialog
      :show="showConfirmDialog"
      @cancel="showConfirmDialog = false"
      @ok="handleDelete"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TaskList from '../components/TaskList.vue';
import TaskEditDialog from '../components/TaskEditDialog.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import apiErrorHandler from '../mixins/apiErrorHandler';

export default {
  components: {
    TaskList,
    TaskEditDialog,
    ConfirmDialog,
  },
  mixins: [apiErrorHandler],
  data() {
    return {
      showEditDialog: false,
      showConfirmDialog: false,
    };
  },
  computed: {
    ...mapGetters(['allTasks', 'selectedTask', 'taskStatus']),
  },
  methods: {
    ...mapActions([
      'fetchTasks',
      'addTask',
      'updateTask',
      'deleteTask',
      'setSelectedTask',
    ]),
    openEditDialog(task) {
      this.setSelectedTask(task);
      this.showEditDialog = true;
    },
    openConfirmDialog(task) {
      this.setSelectedTask(task);
      this.showConfirmDialog = true;
    },
    handleEditDialogClose() {
      this.showEditDialog = false;
      this.setSelectedTask(null);
    },
    async handleDelete() {
      try {
        await this.deleteTask(this.selectedTask.id);
        this.showNotification({
          color: 'success',
          message: 'Task successfully deleted',
        });
        this.setSelectedTask(null);
        await this.fetchTasks();
      } catch (error) {
        this.handleApiError(error);
      }
    },
    async handleSubmit(data) {
      try {
        if (data.id) {
          await this.updateTask(data);
          this.showNotification({
            color: 'success',
            message: 'Task successfully updated',
          });
        } else {
          await this.addTask(data);
          this.showNotification({
            color: 'success',
            message: 'Task successfully created',
          });
        }

        await this.fetchTasks();
        this.showEditDialog = false;
      } catch (error) {
        this.handleApiError(error);
      }
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>
