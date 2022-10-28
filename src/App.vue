<template>
  <div>
    <BtnScraping />
    <Scrap />
  </div>
</template>

<script>
import BtnScraping from "./components/BtnScraping.vue";
import Scrap from "./components/Scrap.vue";
export default {
  name: "App",
  components: { Scrap, BtnScraping },
};
</script>

<style lang="sass">
body
  background-color: rgb(74, 80, 80)
</style>
