<template>
    <login-form @submit="submit"></login-form>
</template>
<script>
import { mapActions } from 'vuex';
import LoginForm from '../components/LoginForm.vue';
import apiErrorHandler from '../mixins/apiErrorHandler';

export default {
  components: { LoginForm },
  mixins: [apiErrorHandler],
  methods: {
    ...mapActions(['login']),
    async submit(credentials) {
      try {
        await this.login(credentials);
        this.showNotification({ message: 'Login Success', color: 'success' });
        this.$router.push('/');
      } catch (error) {
        this.handleApiError(error);
      }
    },
  },
};
</script>
