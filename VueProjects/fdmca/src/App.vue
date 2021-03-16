<template>
  <div>
    <LandPage  />
  </div>
</template>

<script>
import LandPage from "./components/LandPage.vue";

export default {
  name: "App",
  components: {
    LandPage,
  },
};
</script>

<style>
body {
  height: 913px;
  background-image: linear-gradient(to bottom right, #1F0322, #8A1C7C, #DA4167);
}
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
