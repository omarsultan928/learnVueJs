<template>
  <div id="employee-form">
    <form @submit.prevent="handleSubmit">
      <label> Employee Name </label>
      <input
        v-model="employee.name"
        :class="{ 'has-error': submitting && isInvalidName }"
        @focus="clearStatus"
        @keypress="clearStatus"
        type="text"
      />
      <label> Employee Email </label>
      <input
        v-model="employee.email"
        type="text"
        :class="{ 'has-error': submitting && isInvalidEmail }"
        @focus="clearStatus"
        @keypress="clearStatus"
      />
      <p v-if="error && submitting" class="error-message">
        ❗Please fill out all required fields
      </p>
      <p v-if="success" class="success-message">
        ✅ Employee successfully added
      </p>
      <button>Add Employee</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "employee-form",
  data() {
    return {
      submitting: false,
      success: false,
      error: false,
      employee: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();
      if (this.isInvalidEmail || this.isInvalidName) {
        this.error = true;
        return;
      }
      this.$emit("add:employee", this.employee);
      this.employee = {
        name: "",
        email: "",
      };
      this.submitting = false;
      this.success = true;
      this.error = false;
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    },
  },
  computed: {
    isInvalidName() {
      return this.employee.name === "";
    },
    isInvalidEmail() {
      return this.employee.email === "";
    },
  },
};
</script>
<style scoped>
form {
  margin-bottom: 2rem;
}
[class*="-message"] {
  font-weight: 500;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

.error-message {
  color: #d33c40;
}

.success-message {
  color: #32a95d;
}
</style>
