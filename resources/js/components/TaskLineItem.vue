<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>#{{ task.id }} {{ task.name }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <div>
        <v-chip size="x-small" class="mr-2" >{{ task.createdAt }}</v-chip>
        <v-chip size="x-small" :color="getStatusColor(task.status)">{{ task.status }}</v-chip>
        <v-btn icon @click.stop="handleDeleteClick">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click.stop="handleEditClick">
          <v-icon color="orange">mdi-pen</v-icon>
        </v-btn>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
export default {
  name: 'TaskList',
  props: {
    task: Object,
  },
  methods: {
    getStatusColor(status) {
      switch (status) {
        case 'pending':
          return 'orange';
        case 'done':
          return 'green';
        case 'in progress':
          return 'yellow';
        default:
          return 'blue';
      }
    },
    handleDeleteClick() {
      this.$emit('delete');
    },
    handleEditClick() {
      this.$emit('edit');
    },
  },
};
</script>
