<template>
  <div
    class="hot-topic-cell"
    @click="$router.push({ name: 'Topic', params: { id: opt.topic.actId } })"
  >
    <div class="left">
      <div class="icon">
        <van-icon name="flag-o" />
      </div>
      <div class="title van-ellipsis">
        {{ opt.topic.title }}
      </div>
      <span v-if="opt.topic.isHot" class="hot">HOT</span>
    </div>
    <div v-if="opt.showCount" class="count">
      {{ opt.topic.participateCount | countFormat }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["opt"],
  filters: {
    countFormat(v) {
      return v < 10000
        ? v
        : v < 100000000
        ? parseInt(v / 10000) + "万热度"
        : parseInt(v / 100000000) + "万热度";
    },
  },
};
</script>
<style lang="less" scoped>
.hot-topic-cell {
  width: 90vw;
  height: 10vw;
  display: flex;
  align-content: center;
  .left {
    display: flex;
    align-content: center;
    flex: 1;
  }
  .title {
    width: 35vw;
    padding-left: 3vw;
  }
  .icon {
    color: #4891dd;
    background: #edf4fb;
    width: 5vw;
    height: 5vw;
    border-radius: 5vw;
    text-align: center;
  }
  .hot {
    color: #fd383a;
    font-weight: 900;
    font-style: italic;
  }
}
</style>
