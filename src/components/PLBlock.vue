<template>
  <div class="play-list-block">
    <router-link :to="opt.route">
      <img :src="opt.pl.picUrl" alt="" />
      <div class="count">
        <van-icon
          class="iconfont"
          slot="icon"
          class-prefix="icon"
          name="bofang"
        ></van-icon>
        <span> {{ opt.pl.playCount || opt.pl.playcount | countFormat }}</span>
      </div>
    </router-link>
    <div class="van-multi-ellipsis--l2">{{ opt.pl.name }}</div>
  </div>
</template>

<script>
export default {
  props: ["opt"],
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
  width: 25vw;
  height: 35vw;
  display: flex;
  flex-direction: column;
  a {
    position: relative;
    flex: 1;
  }
  .count {
    height: 6vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000070;
    position: absolute;
    color: white;
    top: 0.5vw;
    right: -1vw;
    font-size: 4vw;
    padding: 0 1vw;
    border-radius: 6vw;
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
    width: 25vw;
    height: 25vw;
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
