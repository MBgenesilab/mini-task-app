<template>
    <v-list v-if="tasks.length">
      <template v-for="(task, index) in tasks">
        <v-list-group
          v-if="task.subTasks && task.subTasks.length"
          :key="task.id"
          :value="task.expanded"
          @click="task.expanded = !task.expanded"
        >
          <template v-slot:activator>
            <TaskLineItem
              :task="task"
              @edit="editTask(task)"
              @delete="deleteTask(task)"
            />
          </template>
          <TaskList
            :tasks="task.subTasks"
            @edit="editTask"
            @delete="deleteTask"
          />
        </v-list-group>
        <TaskLineItem
          v-else
          :key="index"
          :task="task"
          @edit="editTask(task)"
          @delete="deleteTask(task)"
        />
      </template>
    </v-list>
  </template>

<script>
import TaskLineItem from './TaskLineItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskLineItem,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editTask(task) {
      this.$emit('edit', task);
    },
    deleteTask(task) {
      this.$emit('delete', task);
    },
  },
};
</script>
<style>
.v-list-group {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.v-list-group__items {
  padding: 0 66px;
}
</style>
