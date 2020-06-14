<template>
  <div id="app">
    <comments />
  </div>
</template>

<script>
import Comments from "./components/Comments.vue";

export default {
  name: "App",
  components: {
    Comments,
  },
};
</script>

<style>
body {
  overflow-y: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
