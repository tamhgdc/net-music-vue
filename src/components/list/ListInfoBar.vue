<template>
  <div class="list-info-bar">
    <div class="circle">
      <nav v-if="detail != undefined">
        <div class="item">
          <van-icon size="6vw" name="add-o" />
          <span>{{ detail.subscribedCount | countFormat }}</span>
        </div>
        |
        <div class="item">
          <van-icon size="6vw" name="comment-o" />
          <span>{{ detail.commentCount | countFormat }}</span>
        </div>
        |
        <div class="item">
          <van-icon size="5vw" name="share-o" />
          <span>{{ detail.shareCount | countFormat }}</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detail"],
  filters: {
    countFormat(v) {
      return v < 10000
        ? v
        : v < 100000000
        ? parseInt(v / 1000) / 10 + "万"
        : parseInt(v / 10000000) / 10 + "亿";
    },
  },
};
</script>

<style lang="less" scoped>
.list-info-bar {
  position: relative;
  overflow: hidden;
  width: 65vw;
  height: 10vw;
  border-radius: 10vw;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0.5vw 0.2vw 0 #00000030;
  nav {
    height: 10vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        margin-left: 1vw;
      }
    }
  }
}
</style>
