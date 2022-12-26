<template>
  {{ message }}
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Home",
  setup() {
    const message = ref("You are not logged in!");
    onMounted(async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //   console.log(await response.json());
      const content = await response.json();

      message.value = `Hello ${content.name}`;
    });

    return {
      message,
    };
  },
};
</script>

<style></style>
