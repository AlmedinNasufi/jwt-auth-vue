<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>

      <div>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item" v-if="auth">
            <router-link
              class="nav-link active"
              to="/login"
              @click.prevent="logout()"
              >Logout</router-link
            >
          </li>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link active" to="/login"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/register"
                >Register</router-link
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useUserStore } from "../stores/user";

export default {
  name: "Nav",
  setup() {
    const userStore = useUserStore();

    const auth = computed(() => {
      console.log(userStore.is_authenticated);
      return userStore.is_authenticated;
    });

    const logout = async () => {
      try {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        userStore.setAuth(false);
      } catch (e) {
        console.log(e);
      }
    };

    return {
      auth,
      logout,
    };
  },
};
</script>
