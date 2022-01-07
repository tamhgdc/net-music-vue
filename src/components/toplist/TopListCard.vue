<template>
  <div class="top-list-Card">
    <div :class="['card', opt.pl.ToplistType]">
      <div class="header">{{ opt.pl.updateFrequency }}</div>
      <div class="main">
        <div class="left">
          <div class="title">{{ opt.pl.name }}</div>
          <div class="cover" @click="playAll">
            <img
              v-show="urls.length <= 0"
              :src="opt.pl.coverImgUrl"
              width="50vw"
              height="50vw"
              alt=""
            />
            <img
              v-for="url in urls"
              :key="url"
              :src="url + '?param=100y100'"
              alt=""
            />
            <img src="../../assets/play.png" alt="" />
          </div>
        </div>
        <div class="right" @click="$router.push(opt.route)">
          <div class="item" v-for="(t, i) in opt.pl.tracks" :key="t.first">
            <p>{{ i + 1 }}.{{ t.first }} - {{ t.second }}</p>
            <p>-</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { loadPlaylistDetailByIdAPI } from "../../service/playlist";
export default {
  props: ["list", "opt"],
  data() {
    return {
      urls: [],
    };
  },
  created() {
    console.log(this.opt);
    loadPlaylistDetailByIdAPI(this.opt.pl.id).then((res) => {
      this.urls = res.playlist.tracks
        .slice(0, 3)
        .map((x) => x.al.picUrl)
        .reverse();
    });
  },
  methods: {
    playAll() {
      this.playAllByPlaylistId(this.opt.pl.id);

      this.$router.push({
        name: "Player",
      });
    },
    ...mapActions("player", ["playAllByPlaylistId"]),
  },
};
</script>

.
<style lang="less" scoped>
.top-list-Card {
  padding: 1vw 0;
  .card {
    width: 100%;
    height: 35vw;
    border-radius: 3vw;
    box-sizing: border-box;
    padding: 1vw 5vw;
    .header {
      text-align: right;
      font-size: 3vw;
    }
    .main {
      display: flex;
      .left {
        flex-basis: 25vw;
        .title {
          font-size: 5vw;
          font-weight: 900;
          padding-bottom: 2vw;
        }
        .cover {
          width: 20vw;
          height: 20vw;
          position: relative;
          img {
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 1vw;
          }
          img:nth-of-type(4) {
            width: 15vw;
            height: 15vw;
          }
          img:nth-of-type(3) {
            width: 12vw;
            height: 12vw;
            left: 4.5vw;
            top: 3vw;
            opacity: 0.7;
          }
          img:nth-of-type(2) {
            width: 10vw;
            height: 10vw;
            left: 8vw;
            top: 5vw;
            opacity: 0.5;
          }
          img:nth-of-type(5) {
            left: 5vw;
            top: 5vw;
            opacity: 0.6;
          }
        }
      }
      .right {
        padding-top: 2vw;
        flex: 1;
        height: 22vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    &.H {
      background-color: #f2e0e0;
      .title {
        color: #e12323;
      }
    }
    &.O {
      background-color: #e2e6ef;
      .title {
        color: #376ec0;
      }
    }
    &.N {
      background-color: #e0eae9;
      .title {
        color: #25988b;
      }
    }
    &.S {
      background-color: #f3e1e7;
      .title {
        color: #e72e77;
      }
    }
  }
}
</style>
