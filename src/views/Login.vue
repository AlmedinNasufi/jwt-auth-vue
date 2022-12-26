import { reactive } from 'vue';
<template>
  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        v-model="data.email"
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        v-model="data.password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";

export default {
  name: "Login",
  setup() {
    const storeUser = useUserStore();
    const data = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const submit = async () => {
      try {
        await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        storeUser.setAuth(true);

        await router.push("/");
      } catch (error) {
        storeUser.setAuth(false);
      }
    };

    return {
      data,
      submit,
    };
  },
};
</script>
