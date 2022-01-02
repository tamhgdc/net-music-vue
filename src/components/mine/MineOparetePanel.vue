<template>
  <van-grid class="mine-op" :border="false">
    <van-grid-item
      v-for="o in options"
      :key="o.icon"
      :text="o.text"
      :to="o.link"
    >
      <template v-slot:icon>
        <van-icon
          class="iconfont"
          slot="icon"
          class-prefix="icon"
          :name="o.icon"
        ></van-icon>
      </template>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { text: "最近播放", icon: "bofangzanting", link: "/" },
        { text: "本地/下载", icon: "xiazai1", link: "/" },
        { text: "云盘", icon: "yunpan", link: "/" },
        { text: "已购", icon: "yigou", link: "/" },
        { text: "我的好友", icon: "haoyoujinqun", link: "/" },
        { text: "收藏和赞", icon: "shoucang", link: "/" },
        { text: "我的播客", icon: "guangbo", link: "/" },
        { text: "助眠解压", icon: "yueliang", link: "/" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.mine-op {
  .iconfont {
    font-size: 10vw !important;

    color: #ff3b3c;
  }
}
</style>
