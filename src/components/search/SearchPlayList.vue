<template>
  <div class="play-list">
    <SearchPlayListCell
      v-for="item in data.playlists"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import SearchPlayListCell from "./SearchPlayListCell.vue";
export default {
  props: ["data"],
  components: {
    SearchPlayListCell,
  },
};
</script>

<style></style>
