<template>
  <div
    :style="{ bottom: $route.meta.isNavShow ? '10vh' : '0' }"
    v-if="playlist.length > 0"
    class="mini-player"
  >
    <div class="left" @click="goToPlayer">
      <div class="disc">
        <PlayerDisc
          :state="playState"
          :imgSrc="readied ? curr.al.picUrl || curr.album.picUrl : null"
          :size="'15vw'"
        />
      </div>
      <van-notice-bar
        class="name"
        scrollable
        color="black"
        :text="readied ? curr.name : null"
      />
    </div>

    <div class="right">
      <div @click="clickHandle">
        <van-circle
          layer-color="#f1f1f1"
          color="red"
          v-model="currRate"
          :rate="100"
          size="9vw"
        >
          <template #default>
            <van-icon
              style="line-height: 9vw"
              color="red"
              :name="playState ? 'pause' : 'play'"
              size="6vw"
            />
            <van-icon name="" />
          </template>
        </van-circle>
      </div>

      <PlayerActionSheet :size="'6vw'" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PlayerDisc from "./player/PlayerDisc.vue";
import PlayerActionSheet from "./player/PlayerActionSheet.vue";
export default {
  data() {
    return {
      state: false,
    };
  },
  mounted() {},
  updated() {},
  methods: {
    goToPlayer() {
      if (this.curr) {
        this.$router.push({
          name: "Player",
          params: {
            id: this.curr.id,
            n: this.curr.name,
          },
        });
      }
    },
    clickHandle() {
      if (this.playState) {
        this.pause();
      } else {
        this.play();
      }
    },
    ...mapActions("player", ["play", "pause"]),
  },
  components: {
    PlayerDisc,
    PlayerActionSheet,
  },
  computed: {
    ...mapState("player", [
      "playlist",
      "myPlayer",
      "playState",
      "curr",
      "percent",
    ]),
    currRate: {
      get() {
        return this.percent ? this.percent : 0;
      },
      set(newValue) {
        return newValue;
      },
    },
    readied() {
      return JSON.stringify(this.curr) != "{}";
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.mini-player {
  width: 100vw;
  height: 12vw;
  background-color: #ffffffee;
  position: fixed;
  bottom: 10vh;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;

    .disc {
      width: 20vw;
      .img-wrap {
        position: absolute;
        bottom: 1vw;
        left: 2vw;
      }
    }
    .name {
      width: 50vw;
      line-height: 12vw;
      font-size: 4.5vw;
      background-color: transparent;
    }
  }
  .right {
    width: 30vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
