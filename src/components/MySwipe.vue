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
        <img :src="item.imageUrl" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { loadBannersAPI } from "../service/banners";
export default {
  data() {
    return {
      banners: [],
    };
  },
  created() {
    loadBannersAPI().then((res) => {
      this.banners = res.banners;
    });
  },
};
</script>

<style lang="less" scoped>
.my-swipe {
  position: relative;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
}
.my-swipe .van-swipe-item {
  color: #fff;
  text-align: center;
  img {
    width: 100vw;
  }
}
.van-swipe-indicators {
  bottom: -10vw;
}
</style>
