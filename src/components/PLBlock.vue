<template>
  <div class="play-list-block">
    <router-link :to="opt.route">
      <img :src="opt.pl.picUrl" alt="" />
    </router-link>
    <div class="van-multi-ellipsis--l2">{{ opt.pl.name }}</div>
  </div>
</template>

<script>
export default {
  props: ["opt"],
};
</script>

<style lang="less" scoped>
.play-list-block {
  width: 25vw;
  height: 35vw;

  a {
    position: relative;
  }
  img {
    width: 25vw;
    height: 25vw;
    border-radius: 5vw;
  }
  div {
    width: 25vw;
    height: 10vw;
    line-height: 5vw;
    font-size: 4vw;
    text-overflow: clip !important;
  }
}
</style>
