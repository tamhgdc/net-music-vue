<template>
  <div class="remd-list">
    <PLBlock
      v-for="pl in playlist"
      :key="pl.id"
      :opt="{
        route: {
          name: 'List',
          params: {
            id: pl.id,
            type: 'ListBaseHeader',
          },
        },
        pl,
      }"
    />
  </div>
</template>

<script>
import PLBlock from "../PLBlock.vue";
export default {
  props: ["playlist"],
  components: {
    PLBlock,
  },
};
</script>

<style lang="less" scoped>
.remd-list {
  padding: 0 2vw;
  display: grid;
  grid-template-columns: repeat(3, 32%);
  grid-gap: 2vw;
  padding-top: 2vw;
}
</style>
