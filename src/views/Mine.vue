<template>
  <div class="mine">
    <MineBaseInfo></MineBaseInfo>
    <h1>我的</h1>
  </div>
</template>

<script>
import MineBaseInfo from "../components/mine/MineBaseInfo.vue";
export default {
  components: {
    MineBaseInfo,
  },
};
</script>

<style lang="less" scoped>
.mine {
  overflow: hidden;
  & > div {
    width: 95vw;
    margin-left: auto;
    margin-right: auto;
    padding: 5vw 0;
    border-radius: 3vw;
  }
}
</style>
