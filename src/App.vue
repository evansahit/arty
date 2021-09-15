<template>
  <Menu />
  <router-view :key="$route.fullPath" />
  <Footer />
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import Menu from "./components/Menu.vue";
  import Footer from "./components/Footer.vue";

  export default defineComponent({
    name: "App",
    components: {
      Menu,
      Footer,
    },
  });
</script>
