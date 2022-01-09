<template>
  <div v-if="data" class="song-list">
    <ListCell
      v-for="(item, i) in list"
      :opt="{ song: item.songs[0], i, detail: item.privileges[0] }"
      :key="item.songs[0].id"
    >
      <template #leftIcon>
        <img :src="item.songs[0].al.picUrl + '?param=50y50'" alt="" />
      </template>
    </ListCell>
  </div>
</template>

<script>
import ListCell from "../list/ListCell.vue";

import { loadSongDetailsAPI } from "../../service/song";
export default {
  props: ["data"],
  data() {
    return {
      list: [],
    };
  },
  created() {
    loadSongDetailsAPI(this.data.songs.map((x) => x.id)).then((res) => {
      this.list = res;
    });
  },
  components: {
    ListCell,
  },
};
</script>

<style></style>
