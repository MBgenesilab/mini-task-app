<template>
  <v-snackbar
    v-model="notification.show"
    :color="notification.color"
    :timeout="notification.timeout"
    top
    right
  >
    {{ notification.message }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="hideNotification">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['notificationState']),
    notification() {
      return this.notificationState;
    },
  },
  methods: {
    ...mapActions(['hideNotification']),
  },
};
</script>
