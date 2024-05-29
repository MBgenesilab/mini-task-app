<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card class="elevation-12" style="width: 500px">
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            label="Password"
            type="password"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" :to="'/register'"> Register </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: 'admin@gmail.com',
      password: 'password',
      rules: {
        email: (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        required: (value) => !!value || 'Required.',
      },
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', { email: this.email, password: this.password });
      }
    },
  },
};
</script>
