<template>
  <div class="main-player">
    <PlayerOperatePanel :id="id" />
    <!-- 进度条时间 -->
    <div class="play-times">
      <span>{{ currTime | format }}</span>
      <span>
        <PlayerProgress />
      </span>
      <span>{{ duration | format }}</span>
    </div>
    <!-- 播放控制 -->
    <!-- 播放模式 -->
    <div class="play-control">
      <van-icon
        class="iconfont"
        slot="icon"
        class-prefix="icon"
        @click="changeMode"
        :name="mode ? 'suijibofang-' : 'liebiaoxunhuan'"
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
        size="15vw"
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
import PlayerProgress from "./PlayerProgress.vue";
import PlayerActionSheet from "./PlayerActionSheet.vue";
import PlayerOperatePanel from "./PlayerOperatePanel.vue";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
  props: ["id"],
  methods: {
    ...mapMutations("player", ["addUrl", "settingUrl", "changeMode"]),
    ...mapActions("player", ["playById", "play", "pause", "prev", "next"]),
  },
  computed: {
    ...mapGetters("player", ["currId"]),
    ...mapState("player", ["playState", "mode", "duration", "currTime"]),
  },
  watch: {},
  created() {},
  mounted() {
    this.playById(this.id);
  },
  components: {
    PlayerActionSheet,
    PlayerProgress,
    PlayerOperatePanel,
  },
  filters: {
    format(v) {
      const m = v
        ? String(v < 60 ? 0 : parseInt(v / 60)).padStart(2, "0")
        : "00";
      const s = v ? String(parseInt(v - m * 60)).padStart(2, "0") : "00";
      return m + ":" + s;
    },
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
    height: 5vw;
    display: flex;
    align-items: center;

    span {
      width: 15vw;
      text-align: center;
      color: white;
      height: 5vw;
    }
    span:nth-of-type(2) {
      flex: 1;
    }
  }
  .play-control {
    display: flex;
    height: 15vw;
    justify-content: space-around;
    align-items: center;
    color: white;

    .iconfont {
      font-size: 6vw;
    }
  }
}
</style>
