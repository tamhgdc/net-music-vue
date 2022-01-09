<template>
  <div class="operate">
    <div class="o-left">
      <div class="item">
        <van-icon name="share-o" />
        <span>{{ e.forwardCount }}</span>
      </div>
      <div
        class="item"
        @click="
          $router.push({
            name: 'Comment',
            params: {
              id: e.info.commentThread.id,
            },
          })
        "
      >
        <van-icon name="chat-o" />
        <span>{{ e.info.commentCount }}</span>
      </div>
      <div class="item">
        <van-icon :name="e.info.liked ? 'good-job' : 'good-job-o'" />
        <span>{{ e.info.likedCount }}</span>
      </div>
    </div>
    <div class="o-right">
      <van-icon name="share-o" @click="showShare = true" />
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: ["e"],
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
  },
};
</script>

<style lang="less" scoped>
.operate {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 10vw;
  font-size: 5vw;
  padding: 2vw 0;
  .o-left {
    display: flex;
    width: 60vw;
    .item {
      span {
        padding: 0 2vw;
        font-size: 4vw;
      }
    }
  }
}
</style>
