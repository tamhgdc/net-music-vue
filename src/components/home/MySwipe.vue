<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe
      duration="1000"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="item in banners" :key="item.bannerId">
        <img :src="item.pic" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: ["banners"],
};
</script>

<style lang="less" scoped>
.my-swipe {
  position: relative;
  width: 90vw;
  margin: 0 auto;
  border-radius: 10px;
  background-color: aqua;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  color: #fff;
  text-align: center;
  img {
    width: 100%;
  }
}
.van-swipe-indicators {
  bottom: -10vw;
}
</style>
