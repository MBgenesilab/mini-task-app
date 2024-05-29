<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline"> Delete </v-card-title>
      <v-card-text> Are you sure you want to delete this item? </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn @click="cancel"> Cancel </v-btn>
        <v-btn color="info" @click="ok"> Ok </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: this.show,
    };
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
        this.$emit('cancel');
      }
    },
    show(newVal) {
      this.dialog = newVal;
    },
  },
  methods: {
    ok() {
      this.dialog = false;
      this.$emit('ok');
    },
    cancel() {
      this.dialog = false;
      this.$emit('cancel');
    },
  },
};
</script>
