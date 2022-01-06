<template>
  <div class="playlist-plaza">
    <BaseTopNav />
    <div class="wrap">
      <div class="tags-link" @click="$router.push({ name: 'Tags' })">
        <van-icon name="apps-o" />
      </div>
      <van-tabs
        v-model="active"
        animated
        sticky
        title-active-color="#333"
        title-inactive-color="#666"
      >
        <van-tab title="标签 1" name="a">内容 1</van-tab>
        <van-tab title="标签 2" name="b">内容 2</van-tab>
        <van-tab title="标签 3" name="c">内容 3</van-tab>
        <van-tab title="标签 1" name="a">内容 1</van-tab>
        <van-tab title="标签 2" name="b">内容 2</van-tab>
        <van-tab title="标签 3" name="c">内容 3</van-tab>
        <van-tab title="标签 1" name="a">内容 1</van-tab>
        <van-tab title="标签 2" name="b">内容 2</van-tab>
        <van-tab title="标签 3" name="c">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
export default {
  data() {
    return {
      active: 2,
    };
  },
  components: {
    BaseTopNav,
  },
};
</script>

<style lang="less" scoped>
.playlist-plaza {
  width: 100vw;
  height: 100vh;
  .wrap {
    position: relative;
    .tags-link {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      height: 14vw;
      width: 14vw;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6vw;
      box-shadow: -1vw 0 1vw #00000030;
    }
  }
}
</style>
