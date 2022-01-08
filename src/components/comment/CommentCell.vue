<template>
  <div v-if="comment" class="cmt-cell">
    <div class="left">
      <div
        :style="{
          background: `url(${comment.user.avatarUrl + '?param=100y100'})`,
        }"
      ></div>
      <img
        v-if="comment.pendantData != undefined"
        :src="comment.pendantData.imageUrl + '?param=100y100'"
        alt=""
      />
    </div>
    <div class="right">
      <div class="header">
        <div>
          <div class="username">{{ comment.user.nickname }}</div>
          <div class="time">{{ comment.timeStr }}</div>
        </div>
        <div>
          <span class="liked-count">{{
            comment.likedCount | countFormat
          }}</span>
          <van-icon
            size="5vw"
            :name="comment.liked ? 'good-job' : 'good-job-o'"
            @click="likeOrNot"
          />
        </div>
      </div>
      <div class="content">
        {{ comment.content }}
      </div>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { likeCommentAPI } from "../../service/comment";
export default {
  props: ["comment", "opt"],
  filters: {
    countFormat(v) {
      return v < 10000
        ? v
        : v < 100000000
        ? parseInt(v / 1000) / 10 + "万"
        : parseInt(v / 10000000) / 10 + "亿";
    },
  },
  methods: {
    likeOrNot() {
      likeCommentAPI({
        id: this.opt.id,
        cid: this.comment.commentId,
        type: this.opt.type,
        t: this.comment.liked ? 0 : 1,
      }).then((res) => {
        this.comment.liked = !this.comment.liked;
        if (res.data.dialog) {
          Dialog.alert({
            title: res.data.dialog.title,
            message: res.data.dialog.subtitle,
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cmt-cell {
  width: 90vw;
  display: flex;
  padding: 0 5vw 5vw;
  background: white;
  .left {
    width: 12vw;
    position: relative;
    padding-right: 5vw;
    div {
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 12vw;
      width: 12vw;
      height: 12vw;
    }
    img {
      position: absolute;
      left: -2vw;
      top: -2vw;
      width: 16vw;
      height: 16vw;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f6f6f6;
    .header {
      height: 10vw;
      display: flex;
      justify-content: space-between;
      .username {
        font-size: 5vw;
        color: #666666;
      }
      .time {
        font-size: 3vw;
        color: #a4a3a3;
      }
    }
    .content {
      padding: 5vw 0;
      min-height: 15vw;
    }
  }
}
</style>
