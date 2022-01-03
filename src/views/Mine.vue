<template>
  <div class="mine">
    <MineBaseInfo />
    <MineOparetePanel />
    <MineFavoriteMusic />
    <MinePlayListPanel />
  </div>
</template>

<script>
import MineBaseInfo from "../components/mine/MineBaseInfo.vue";
import MineOparetePanel from "../components/mine/MineOparetePanel.vue";
import MineFavoriteMusic from "../components/mine/MineFavoriteMusic.vue";
import MinePlayListPanel from "../components/mine/MinePlayListPanel.vue";
export default {
  components: {
    MineBaseInfo,
    MineOparetePanel,
    MineFavoriteMusic,
    MinePlayListPanel,
  },
};
</script>

<style lang="less" scoped>
.mine {
  overflow: hidden;
  & > div {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    margin: 5vw;
    padding: 5vw;
    border-radius: 3vw !important;
    background-color: white;
  }
}
</style>
