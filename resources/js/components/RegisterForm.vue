<template>
    <v-container class="d-flex justify-center align-center fill-height">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card class="elevation-12" style="width: 500px;">
          <v-card-title class="headline">Registration</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="form.name"
              :rules="[rules.required]"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              :rules="[rules.required, rules.email]"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              :rules="[rules.required, rules.passMinLenght]"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="info"
              variant="text"
              :to="'/login'"
            >
              Login
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="submit"
            >
              Submit
            </v-btn>
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
      form: {
        name: '',
        email: '',
        password: '',
      },
      rules: {
        email: (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
        required: (value) => !!value || 'Required.',
        passMinLenght: (value) => (value && value.length > 6) || 'minimum 6 characters',
      },
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', this.form);
      }
    },
  },
};
</script>
