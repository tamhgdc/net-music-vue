<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      ref="listWrap"
      @load="onLoad"
      offset="10"
    >
      <van-cell
        @click="play(item)"
        v-for="item in list"
        :key="item.id"
        :title="item.name"
      />
    </van-list>
  </div>
</template>

<script>
import { loadPlaylistAllSongByIdAPI } from "../../service/playlist";
import { mapActions } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      list: [],
      page: 0,
      pageSize: 20,
      playlist: [],
      loading: false,
      finished: false,
    };
  },
  async created() {},
  methods: {
    ...mapActions("player", ["playById"]),
    play(item) {
      this.playById(item.id);
      this.$router.push({
        name: "Player",
        params: {
          id: item.id,
          n: item.name,
        },
      });
    },
    mounted() {
      loadPlaylistAllSongByIdAPI(this.id).then((res) => {
        this.list = res.songs;
      });
    },
    onLoad() {
      console.log("加载");
      loadPlaylistAllSongByIdAPI(this.id).then((res) => {
        console.log(this.finished, this.loading);
        this.playlist = res.songs;
        const i = this.page++ * this.pageSize;
        const curr = i + this.pageSize;
        this.list.push(...this.playlist.slice(i, curr));
        this.loading = false;
        if (this.page * this.pageSize >= this.playlist.length) {
          console.log("加载完了");
          this.finished = false;
        }
      });
    },
  },
};
</script>

<style></style>
