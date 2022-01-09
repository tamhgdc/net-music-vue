<template>
  <div v-if="list.length > 0" class="search-synthesis">
    <div class="card">
      <div class="title">单曲</div>
      <ListCell
        v-for="(item, i) in list"
        :opt="{ song: item.songs[0], i, detail: item.privileges[0] }"
        :key="item.songs[0].id"
      >
        <template #leftIcon>
          <img :src="item.songs[0].al.picUrl + '?param=50y50'" alt="" />
        </template>
      </ListCell>
      <div class="more" @click="$emit('setAct', 1)">查找全部</div>
    </div>
    <div class="card">
      <div class="title">歌单</div>
      <SearchPlayListCell
        v-for="item in playlist"
        :key="item.id"
        :item="item"
      />
      <div class="more" @click="$emit('setAct', 2)">查找全部</div>
    </div>
  </div>
</template>

<script>
import ListCell from "../list/ListCell.vue";
import SearchPlayListCell from "./SearchPlayListCell.vue";
import { loadSongDetailsAPI } from "../../service/song";
export default {
  props: ["type", "data"],
  data() {
    return {
      list: [],
      playlist: [],
    };
  },
  components: {
    ListCell,
    SearchPlayListCell,
  },
  watch: {
    data(v) {
      if (v) {
        loadSongDetailsAPI(v.song.songs.map((x) => x.id)).then((res) => {
          this.list = res;
        });
        this.playlist = v.playList.playLists;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-synthesis {
  .card {
    background: white;
    .title {
      height: 10vw;
      line-height: 10vw;
      font-size: 5vw;
      padding-left: 3vw;
      font-weight: 600;
      border-bottom: 1px solid #cecece80;
    }
    .more {
      border-top: 1px solid #cecece80;
      padding: 2vw 0;
      text-align: center;
    }
  }
}
</style>
