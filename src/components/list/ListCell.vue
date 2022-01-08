<template>
  <div class="list-cell">
    <!-- 左侧图标/歌曲图片 -->
    <div class="left-icon">
      <slot name="leftIcon">
        {{ opt.i }}
      </slot>
    </div>

    <!-- 歌曲信息 -->
    <div class="song-info" @click="clickHandle">
      <div class="song-name">
        {{ opt.song.name }}
        <span v-if="opt.song.alia.length > 0"> ({{ opt.song.alia[0] }}) </span>
      </div>
      <div class="song-misc">
        <span v-show="isShowVIP" class="misc-mark vip">VIP</span>
        <span v-show="isShowFee" class="misc-mark fee">试听</span>
        <span v-show="isShowSQ" class="misc-mark sq">SQ</span>
        {{ opt.song.ar | artistsFlat }}
        -
        {{ opt.song.al.name }}
      </div>
    </div>
    <!-- 单元格右侧 -->
    <div class="right">
      <van-icon
        class="iconfont"
        slot="icon"
        class-prefix="icon"
        name="youtube"
      ></van-icon>
      <van-icon
        class="iconfont"
        slot="icon"
        class-prefix="icon"
        name="gengduo1"
      ></van-icon>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["opt"],
  methods: {
    clickHandle() {
      this.playById(this.opt.song.id);
      this.$router.push({
        name: "Player",
      });
      console.log(this.opt.song.id);
    },
    ...mapActions("player", ["playById"]),
  },
  computed: {
    isShowSQ() {
      return this.opt.detail.maxbr > 320000;
    },
    isShowVIP() {
      return this.opt.detail.sp == 0 && this.opt.detail.cp == 0;
    },
    isShowFee() {
      return this.opt.detail.fee == 1;
    },
  },
  filters: {
    artistsFlat(v) {
      return v.map((x) => x.name).join("/");
    },
  },
};
</script>

<style lang="less" scoped>
@dc: #999;
.list-cell {
  height: 15vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vw 2vw;
  background-color: white;
  cursor: pointer;

  .left-icon {
    flex-basis: 15vw;
    height: 15vw;

    line-height: 15vw;
    text-align: center;
    font-weight: 300;
    font-size: 6vw;
    color: @dc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 1.5vw;
    }
  }
  .song-info {
    flex: 1;
    padding-left: 2vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .song-name,
    .song-misc {
      width: 60vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 4.5vw;
    }
    .song-name {
      span {
        color: #999999;
      }
    }
    .song-misc {
      font-size: 3vw;
      color: @dc;
    }
    .misc-mark {
      box-sizing: border-box;
      display: inline-block;
      border: 1px solid #ff000050;
      padding: 0 0.5vw;
      margin-right: 00.5vw;
      border-radius: 1vw;
      color: red;
    }
    .fee {
      border-color: #87ceeb80;
      color: #87ceeb;
    }
    .vip {
      border-color: #ea705780;
      color: #ea7057;
    }
  }
  .right {
    flex-basis: 10vw;
    .iconfont {
      font-size: 7vw;
      padding: 1vw;
      color: #b3b3b3;
    }
  }
}
</style>
