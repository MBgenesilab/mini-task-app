<template>
    <register-form @submit="submit"></Register-form>
</template>
<script>
import { mapActions } from 'vuex';
import RegisterForm from '../components/RegisterForm.vue';
import apiErrorHandler from '../mixins/apiErrorHandler';

export default {
  components: { RegisterForm },
  mixins: [apiErrorHandler],
  methods: {
    ...mapActions(['register', 'showNotification']),
    async submit(credentials) {
      try {
        await this.register(credentials);
        this.showNotification({ message: 'Register Success', color: 'success' });
        this.$router.push('/');
      } catch (error) {
        this.handleApiError(error);
      }
    },
  },
};
</script>
