<template>
  <div>
    <Top />
    <div class="mine">
      <MineBaseInfo />
      <MineOperatePanel />
      <MineFavoriteMusic />
      <MinePlayListPanel />
    </div>
  </div>
</template>

<script>
import Top from "../components/Top.vue";
import MineBaseInfo from "../components/mine/MineBaseInfo.vue";
import MineOperatePanel from "../components/mine/MineOperatePanel.vue";
import MineFavoriteMusic from "../components/mine/MineFavoriteMusic.vue";
import MinePlayListPanel from "../components/mine/MinePlayListPanel.vue";
export default {
  components: {
    Top,
    MineBaseInfo,
    MineOperatePanel,
    MineFavoriteMusic,
    MinePlayListPanel,
  },
};
</script>

<style lang="less" scoped>
.mine {
  overflow: scroll;
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
