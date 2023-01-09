<template>
  <h1>Forms</h1>
  <div className="App">

        <h2>Registration</h2>
        <input
          data-testid="field-name"
          placeholder="Name*"
          type="text"
          v-model="formData.name"
          required
        />
        <!-- {errors.name && <p className="error" data-testid="error-name">{errors.name}</p>} -->
        <input
          data-testid="field-age"
          placeholder="Age"
          type="number"
          v-model="formData.age"
        />
        <!-- {errors.age && <p className="error" data-testid="error-age">{errors.age}</p>} -->
        <input
          data-testid="field-email"
          placeholder="Email*"
          type="email"
          v-model="formData.email"
          required
        />
        <!-- {errors.email && <p className="error" data-testid="error-email">{errors.email}</p>} -->
        <input
          data-testid="field-password"
          placeholder="Password*"
          type="password"
          v-model="formData.password"
          required
        />
        <!-- {errors.password && <p className="error" data-testid="error-password">{errors.password}</p>} -->
        <select data-testid="field-gender" v-model="formData.gender">
          <option value="DEFAULT" disabled>
            Select gender*
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
          <option value="non-binary">
            Non-binary
          </option>
        </select>
        <button type="submit" className="submit" data-testid="button-submit">
          Submit
        </button>
    </div>
</template>

<script setup>
import { reactive } from 'vue';


const formData = reactive({
      name: "",
      age: null,
      email: "",
      password: "",
      gender: 0
    });
</script>

<style>
input, select {
  display: block;
}
</style>