<template>
  <div class="play-list-block">
    <router-link :style="{ height: size, width: size }" :to="opt.route">
      <img :src="opt.pl.picUrl || opt.pl.coverImgUrl" alt="" />
      <div class="count">
        <slot name="title">
          <van-icon
            class="iconfont"
            slot="icon"
            class-prefix="icon"
            name="bofang"
          ></van-icon>
          <span> {{ opt.pl.playCount || opt.pl.playcount | countFormat }}</span>
        </slot>
      </div>
    </router-link>
    <div class="van-multi-ellipsis--l2">{{ opt.pl.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    opt: {
      type: Object,
    },
    size: {
      type: String,
      default: "25vw",
    },
  },
  filters: {
    countFormat(v) {
      return v < 10000
        ? v
        : v < 100000000
        ? parseInt(v / 10000) + "万"
        : parseInt(v / 100000000) + "亿";
    },
  },
};
</script>

<style lang="less" scoped>
.play-list-block {
  display: flex;
  flex-direction: column;
  a {
    width: 35vw;
    height: 35vw;
    position: relative;
  }
  .count {
    height: 6vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000070;
    color: white;
    position: absolute;
    top: 0.5vw;
    right: -0.5vw;
    font-size: 4vw;
    padding: 0 1.5vw;
    border-radius: 5vw;
    span {
      white-space: nowrap;
      font-weight: 200;
    }
    transform: scale(0.8);
  }
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 2vw;
  }
  > div {
    width: 25vw;
    height: 10vw;
    line-height: 5vw;
    font-size: 3vw;
    text-overflow: clip !important;
  }
}
</style>
