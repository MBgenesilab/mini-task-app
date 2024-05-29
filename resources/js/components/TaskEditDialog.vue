<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card>
      <v-card-title class="headline" v-if="form.id">
        Edit Task # {{ form.id }}</v-card-title
      >
      <v-card-title class="headline" v-else> New Task</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="form.name"
            :rules="[rules.required]"
            label="Name"
            required
          ></v-text-field>
          <v-textarea
            v-model="form.description"
            label="Description"
            required
          ></v-textarea>
          <v-select
            v-model="form.status"
            :items="statusOptions"
            label="Status"
            required
          ></v-select>
          <v-select
            v-model="form.parent_id"
            :items="partentOptions"
            item-text="name"
            item-value="id"
            label="Parent Task"
            persistent-hint
            single-line
          ></v-select>
          <div class="d-flex">
            <v-btn @click="dialog = false">close</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submit">Save</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      form: {
        name: '',
        description: '',
        status: 'todo',
        parent_id: null,
      },
      rules: {
        required: (value) => !!value || 'Required.',
      },
      statusOptions: ['done', 'in progress', 'todo'],
      dialog: this.show,
    };
  },
  computed: {
    ...mapGetters(['selectedTask', 'parentTasks']),
    partentOptions() {
      return this.parentTasks.filter(
        (parentTask) => parentTask.id !== this.form.id,
      );
    },
  },
  methods: {
    submit() {
      if (this.validate()) {
        this.$emit('submit', this.form);
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.resetValidation();
    },
    clear() {
      this.reset();
      this.form = {
        name: '',
        description: '',
        status: 'todo',
        parent_id: null,
      };
    },
  },
  props: {
    show: {
      default: false,
      type: Boolean,
    },
  },
  watch: {
    dialog(newValue) {
      if (!newValue) {
        this.$emit('close');
        this.clear();
      } else if (this.selectedTask) {
        this.form = JSON.parse(JSON.stringify(this.selectedTask));
      }
    },
    show(newVal) {
      this.dialog = newVal;
    },
  },
};
</script>
