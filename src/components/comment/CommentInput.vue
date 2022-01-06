<template>
  <div class="comment-input">
    <input v-model.lazy="content" type="text" placeholder="写评论..." />
    <van-button size="small" type="default" @click="send">发送</van-button>
  </div>
</template>

<script>
import { sendCommentAPI } from "../../service/comment";
export default {
  props: ["opt"],
  data() {
    return {
      content: "",
    };
  },
  methods: {
    send() {
      sendCommentAPI({
        t: 1,
        id: this.opt.id,
        content: this.content,
        type: this.opt.type,
      }).then((res) => {
        this.$emit("send", res);
      });
    },
  },
};
</script>
<style lang="less">
.comment-input {
  .van-button {
    border: none;
    color: black;
  }
}
</style>
<style lang="less" scoped>
.comment-input {
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 14vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  input {
    flex-basis: 70vw;
    height: 7vw;
    font-size: 5vw;
    padding-left: 2vw;
  }
}
</style>
