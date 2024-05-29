<template>
    <v-app-bar>
        <v-app-bar-title>Mini Task</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn variant="danger" @click="logoutAction">Logout</v-btn>
    </v-app-bar>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout']),
    logoutAction() {
      this.logout();
      this.$router.push('/login');
    },
  },
};
</script>
