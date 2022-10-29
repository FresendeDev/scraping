<template>
  <div class="imag">
    <a v-for="link in links" :key="link.id">
      <img :src="link.urlImagem" alt="nada aqui" />
    </a>
  </div>
</template>

<script>
import dados from "../db/amazon.json";

export default {
  name: "Scrap",

  data() {
    return {
      links: String,
    };
  },

  mounted() {
    this.links = dados;

    // console.log(dados);
  },
};
</script>

<style lang="sass" scoped>

.imag
    width: 100px
    height: 100%
</style>
