<template>
  <div class="base-top-nav">
    <van-sticky z-index="1" offset-top="0">
      <div class="nav">
        <div class="left">
          <van-icon name="arrow-left" @click="$router.go(-1)" />
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="right">
          <van-icon name="share-o" />
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less">
.base-top-nav {
  .van-sticky {
    background: white;
  }
  .nav {
    width: 94vw;
    background: white;
    height: 14vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 5vw;
    padding: 0 3vw;
  }
}
</style>
