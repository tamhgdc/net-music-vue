<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      ref="listWrap"
      @load="onLoad"
    >
      <van-cell
        @click="
          $router.push({
            name: 'Player',
            params: {
              id: item.id,
              n:item.name,
            },
          })
        "
        v-for="item in list"
        :key="item.id"
        :title="item.name"
      />
    </van-list>
  </div>
</template>

<script>
import { loadPlaylistByIdAPI } from "../../service/playlist";
export default {
  props: ["id"],
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 6,
      playlist: {},
      loading: false,
      finished: false,
    };
  },
  async created() {},
  methods: {
    async onLoad() {
      if (this.playlist.tracks) {
        console.log("加载");
        const i = this.page * this.pageSize;
        const curr = i + this.pageSize;
        this.list.push(...this.playlist.tracks.slice(i, curr));

        this.loading = false;
        this.page++;
        if (this.page * this.pageSize >= this.playlist.tracks.length) {
          console.log("加载完了");
          this.finished = true;
        }
      } else {
        console.log("初次加载");
        await loadPlaylistByIdAPI(this.id).then((res) => {
          this.playlist = res.playlist;
          this.list.push(...this.playlist.tracks.slice(0, this.pageSize));
          this.loading = false;
          this.$emit("listInfo", this.playlist);
        });
      }
    },
  },
};
</script>

<style></style>
