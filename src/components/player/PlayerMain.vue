<template>
  <div class="main-player">
    <!-- 进度条时间 -->
    <div class="play-times">
      <span :v-text="playState ? getCurrentTime : '00:00'"></span>
      <span
        ><van-progress
          :percentage="75"
          track-color="lightgray"
          pivot-color="lightgray"
          color="#ffffff"
          :show-pivot="false"
          stroke-width=".8vw"
        />
      </span>
      <span :v-text="playState ? getDuration : '00:00'"></span>
    </div>
    <!-- 播放控制 -->
    <!-- 播放模式 -->
    <div class="play-control">
      <van-icon
        class="iconfont"
        slot="icon"
        class-prefix="icon"
        name="liebiaoxunhuan"
      ></van-icon>
      <!-- 上一曲 -->
      <van-icon
        class="iconfont"
        slot="icon"
        class-prefix="icon"
        name="shangyishoushangyige"
        @click="prev"
      ></van-icon>
      <!-- 播放/暂停 -->
      <van-icon
        @click="playState ? pause() : play()"
        :name="playState ? 'pause-circle-o' : 'play-circle-o'"
        size="18vw"
      />
      <!-- 下一曲 -->
      <van-icon
        class="iconfont"
        slot="icon"
        class-prefix="icon"
        name="shangyishoushangyige1"
        @click="next"
      ></van-icon>

      <!-- <van-icon
        class="iconfont"
        slot="icon"
        class-prefix="icon"
        name="24gf-playlist"
      > -->
      <PlayerActionSheet :size="'8vw'" />
      <!-- </van-icon> -->
    </div>
  </div>
</template>

<script>
import PlayerActionSheet from "./PlayerActionSheet.vue";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
  props: ["id"],
  methods: {
    ...mapMutations("player", [
      "addUrl",
      "settingUrl",
      "play",
      "pause",
      "prev",
      "next",
    ]),

    ...mapActions("player", ["playById"]),
  },
  computed: {
    ...mapGetters("player", ["getDuration", "getCurrentTime", "currId"]),
    ...mapState("player", ["playState"]),
  },
  created() {},
  mounted() {
    this.playById(this.id);
  },
  components: {
    PlayerActionSheet,
  },
};
</script>
<style lang="less">
.main-player {
  .van-progress__portion {
    width: 70vw;
  }
}
</style>
<style lang="less" scoped>
.main-player {
  width: 100vw;
  height: 30vw;
  position: fixed;
  bottom: 0;
  .play-times {
    height: 10vw;
    display: flex;
    align-items: center;

    span {
      width: 15vw;
      text-align: center;
      color: white;
    }
    span:nth-of-type(2) {
      flex: 1;
    }
  }
  .play-control {
    display: flex;
    height: 20vw;
    justify-content: space-around;
    align-items: center;
    color: white;

    .iconfont {
      font-size: 8vw;
    }
  }
}
</style>
