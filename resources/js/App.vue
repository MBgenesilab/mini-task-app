<template>
  <v-app>
    <v-container>
      <Navbar v-if="isAuthenticated" />
      <router-view />
    </v-container >
    <Notification />
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

import Navbar from './components/Navbar.vue';
import Notification from './components/Notification.vue';
import { apiService, storageService } from './services';

export default {
  components: {
    Navbar,
    Notification,
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['getUser']),
  },
  created() {
    if (this.isAuthenticated) {
      apiService.setAuthHeader(storageService.get('token'));
      this.getUser();
    }
  },

};
</script>
