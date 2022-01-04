<template>
  <div class="playlist-wrap">
    <van-image :src="listDetail.coverImgUrl" class="list-header" ref="header">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <ListTopNav></ListTopNav>
    <van-sticky offset-top="14vw">
      <div @click="playAll()">
        <van-icon class="play" name="play-circle" />
        <span class="title">播放全部</span>
        <span class="count">({{ count }})</span>
      </div>
      <div>
        <van-icon name="down" />
        <van-icon name="passed" />
      </div>
    </van-sticky>
    <van-cell
      @click="play(item)"
      v-for="item in playlist"
      :key="item.id"
      :title="item.name"
    />
  </div>
</template>

<script>
import {
  loadPlaylistDetailByIdAPI,
  loadPlaylistAllSongByIdAPI,
} from "../service/playlist";
import ListTopNav from "../components/list/ListTopNav";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      currId: "BaseList",
      listDetail: {},
      count: 0,
      loaded: true,
      list: [],
      page: 0,
      pageSize: 20,
      playlist: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this.currId = this.$route.params.type;
    loadPlaylistDetailByIdAPI(this.$route.params.id).then((res) => {
      this.listDetail = res.playlist;
      this.count = this.listDetail.trackIds.length;
      this.loaded = false;
    });
    loadPlaylistAllSongByIdAPI(this.$route.params.id).then((res) => {
      this.playlist = res.songs;
    });
  },

  components: {
    ListTopNav,
  },
  methods: {
    onLoad() {
      console.log("加载");
      loadPlaylistAllSongByIdAPI(this.$route.params.id).then((res) => {
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
    playAll() {
      this.playAllByPlaylistId(this.$route.params.id);
      this.$router.push({
        name: "Player",
      });
    },
    ...mapActions("player", ["playAllByPlaylistId", "playById"]),
  },
};
</script>

<style lang="less">
.list-header {
  height: 80vw;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(2vw);
}
.van-sticky {
  height: 12vw;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 7vw;
  color: #333333;
  div:nth-of-type(1) {
    .van-icon {
      padding: 0 4vw;
    }
    .title {
      font-size: 6vw;
    }
    .count {
      padding-left: 1vw;
      font-size: 4vw;
      color: #999;
    }
    .play {
      color: #fe3c30;
    }
  }
  div:nth-of-type(2) {
    .van-icon {
      padding: 0 2vw;
    }
  }
}
</style>
